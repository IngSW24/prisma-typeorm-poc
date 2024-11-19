# This dockerfile builds an image for the React webapp 
# It's divided in THREE separate stages: dev, build and prod
# 
# - dev (builds an image which can be used for development)
# - build (creates the build of the production image)
# - prod (creates an environment aimed at running the output of the build stage in production)

# -------------
# Stage 1 - dev
# -------------

# let's start from the node image
FROM node:18-alpine as dev 

# set /app as the working directory
WORKDIR /app

# define NODE_ENV as development since this is the dev stage
ENV NODE_ENV development

# let's create the user 'node' which will run the app
RUN addgroup --system --gid 1001 node || true
RUN adduser --system --uid 1001 node || true

# let's copy our current folder content to the image (source code)
COPY --chown=node:node . .

# install dependencies
RUN npm install

# switch to user node to avoid running as root
USER node

# ---------------
# Stage 2 - build
# ---------------

FROM node:18-alpine as build

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 node || true
RUN adduser --system --uid 1001 node || true

# let's copy node_modules from the previous stage so we don't
# have to reinstall them
COPY --chown=node:node --from=dev /app/node_modules ./node_modules

# let's also copy the source code from our local folder
COPY --chown=node:node . .

# let's run the build
RUN npm run build

# now let's clear the dependencies and install only the production ones
RUN npm install --production && npm cache clean --force

# switch to user node to avoid running as root
USER node

# --------------
# Stage 2 - prod 
# --------------

FROM node:18-alpine as prod

# again, working directory and system dependencies
WORKDIR /app
RUN apk add --no-cache libc6-compat

# make node aware that we are running in production
ENV NODE_ENV production

# define node user
RUN addgroup --system --gid 1001 node || true
RUN adduser --system --uid 1001 node || true

# copy from previous stage (build) the build output (/app/dist),
# the node_modules folder containing the dependencies and the
# package.json file containing the scripts 

COPY --chown=node:node --from=build /app/dist dist
COPY --chown=node:node --from=build /app/node_modules node_modules
COPY --chown=node:node --from=build /app/package.json package.json

# Let's install 'serve' globally which can be used to serve the app
RUN npm i -g serve

# Set node as user to avoid running as root
USER node

# Set as the image command the serve command that allows to serve the
# build output as a static web app. The container will start serving when
# started and will run until an error occours or the process is stopped
CMD ["serve", "-s", "/app/dist"]
