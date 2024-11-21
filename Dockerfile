# This dockerfile builds an image for the NestJS API application
# It's divided in THREE separate stages: dev, build and prod
# 
# - dev (builds an image which can be used for development)
# - build (creates the build of the production image)
# - prod (creates an environment aimed at running the output of the build stage in production)

# -------------
# Stage 1 - dev
# -------------

# using alpine linux with node installed
FROM node:18-alpine as dev

# let's install this package cause it's a system dependency
RUN apk add --no-cache libc6-compat

# this command defines the working directory
WORKDIR /app

# let's set NODE_ENV environment variable to development
# so that NODE knows we are running in development
# and can skip some optimizations
ENV NODE_ENV development

# create a node user and a group to avoid running as root
RUN addgroup --system --gid 1001 node || true
RUN adduser --system --uid 1001 node || true

# copy our app folder to the container
COPY --chown=node:node . .

# install dependencies in the container
RUN npm install --frozen-lockfile
RUN chown -R node:node node_modules

RUN chown -R node:node node_modules

# set the running user as node to avoid running as root
USER node

# --------------
# Stage 2 - build
# --------------

FROM node:18-alpine as build

# Let's set again the working directory and install the needed dependencies
WORKDIR /app
RUN apk add --no-cache libc6-compat

# This time, we define NODE_ENV as production so that node knows this is going
# to be a build used for production
ENV NODE_ENV production

# Re-create non-root user for Docker if not exists
RUN addgroup --system --gid 1001 node || true
RUN adduser --system --uid 1001 node || true

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency
# So let's copy node_modules from our previous stage (dev)
COPY --chown=node:node --from=dev /app/node_modules ./node_modules

# And let's also copy the source code again
COPY --chown=node:node . .

# Generate the production build. The build script runs "nest build" to compile the application.
RUN npm run build

# Now let's install only the production dependencies (deleting the development ones)
# Let's also clean npm's cache, this will optimize the size of the image
RUN npm install --production && npm cache clean --force

# again, set the running user as node to avoid running as root
USER node

# --------------
# Stage 3 - prod
# --------------

FROM node:18-alpine as prod

# Let's do the usual intial steps
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Set again to production environment
ENV NODE_ENV production

# Re-create non-root user for Docker if not exists
RUN addgroup --system --gid 1001 node || true
RUN adduser --system --uid 1001 node || true

# Copy only the necessary files from the previous stage (build)
# we will need /app/dist which is the production build
# we will also need node_modules since our dependencies are installed there
# we will also need package.json since it contains scripts for execution
COPY --chown=node:node --from=build /app/dist dist
COPY --chown=node:node --from=build /app/node_modules node_modules
COPY --chown=node:node --from=build /app/prisma prisma
COPY --chown=node:node --from=build /app/package.json package.json

# Set Docker as non-root user
USER node


# This is the final command of the image. It will be used by docker as the command
# that starts the image. The container will die when this command fails or when this
# command is stopped. So, in this case, the container starts by running the production
# server and runs until the production server is stopped.
CMD ["npm", "run", "start:prod:migrate"]

