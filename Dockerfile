FROM node:18-alpine as dev

RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV development

RUN addgroup --system --gid 1001 node || true
RUN adduser --system --uid 1001 node || true

COPY --chown=node:node . .

RUN npm install --frozen-lockfile

USER node

FROM node:18-alpine as build

WORKDIR /app
RUN apk add --no-cache libc6-compat

# Set to production environment
ENV NODE_ENV production

# Re-create non-root user for Docker if not exists
RUN addgroup --system --gid 1001 node || true
RUN adduser --system --uid 1001 node || true

# In order to run `npm run build` we need access to the Nest CLI.
# Nest CLI is a dev dependency.
COPY --chown=node:node --from=dev /app/node_modules ./node_modules
# Copy source code
COPY --chown=node:node . .

# Generate the production build. The build script runs "nest build" to compile the application.
RUN npm run build

# Install only the production dependencies and clean cache to optimize image size.
RUN npm install --production && npm cache clean --force

# Set Docker as a non-root user
USER node

#
# 🚀 Production Server
#
FROM node:18-alpine as prod

WORKDIR /app
RUN apk add --no-cache libc6-compat

# Set to production environment
ENV NODE_ENV production

# Re-create non-root user for Docker if not exists
RUN addgroup --system --gid 1001 node || true
RUN adduser --system --uid 1001 node || true

# Copy only the necessary files
COPY --chown=node:node --from=build /app/dist dist
COPY --chown=node:node --from=build /app/node_modules node_modules
COPY --chown=node:node --from=build /app/package.json package.json

# Set Docker as non-root user
USER node

CMD ["npm", "run", "start:prod"]
