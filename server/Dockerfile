# server/Dockerfile
# =================================================================
# DOCKER IMAGE DEFINITION FOR BACKEND SERVER
# =================================================================
# This Dockerfile defines how to build a Docker container image for our Express backend
# Docker images are like blueprints that define everything needed to run your app
# =================================================================

# =================================================================
# BASE IMAGE
# =================================================================
# FROM specifies the base image to build upon
# We use node:22-alpine which includes:
# - Node.js version 22 (latest LTS)
# - Alpine Linux (a minimal, lightweight Linux distribution - only ~5MB!)
# - npm package manager
#
# WHY ALPINE?
# - Regular node image: ~900MB
# - Alpine version: ~150MB
# - Smaller images = faster downloads, less storage, quicker deployments
FROM node:22-alpine

# =================================================================
# SET WORKING DIRECTORY
# =================================================================
# WORKDIR sets the working directory inside the container
# All subsequent commands (COPY, RUN, CMD) will execute from this directory
# If the directory doesn't exist, Docker creates it automatically
#
# BENEFITS:
# - Keeps container filesystem organized
# - Avoids cluttering the root directory
# - Makes paths predictable and easier to manage
WORKDIR /app

# =================================================================
# COPY DEPENDENCY FILES
# =================================================================
# COPY package files FIRST (before copying source code)
# This is a Docker best practice for LAYER CACHING
#
# HOW DOCKER LAYERS WORK:
# - Each instruction (FROM, COPY, RUN) creates a new "layer"
# - Docker caches these layers
# - If files haven't changed, Docker reuses the cached layer
# - This makes rebuilds MUCH faster
#
# WHY COPY package*.json SEPARATELY?
# - package.json and package-lock.json don't change often
# - Source code (index.js) changes frequently
# - By copying dependencies first, Docker caches the npm install layer
# - When you change index.js, Docker skips reinstalling dependencies
# - This can save 1-2 minutes per rebuild!
#
# SYNTAX BREAKDOWN:
# COPY <source-on-host> <destination-in-container>
# package*.json matches both package.json and package-lock.json (if it exists)
COPY package*.json ./

# =================================================================
# INSTALL DEPENDENCIES
# =================================================================
# RUN executes commands during the image build process
# npm install reads package.json and installs all dependencies
#
# FLAGS EXPLAINED:
# --production: Only install dependencies, NOT devDependencies
# - devDependencies (like testing tools) aren't needed in production
# - Reduces image size and potential security vulnerabilities
# - In package.json: "dependencies" are installed, "devDependencies" are skipped
#
# WHAT HAPPENS:
# 1. npm reads package.json
# 2. Downloads packages from npm registry (express, cors)
# 3. Creates node_modules folder with all dependencies
# 4. This layer is cached - won't re-run unless package.json changes
RUN npm install --production

# =================================================================
# COPY SOURCE CODE
# =================================================================
# Now copy the rest of the application code
# COPY . . means: copy everything from current directory (server/) 
# on host machine to /app in container
#
# FILES COPIED:
# - index.js (our server code)
# - Any other files in server/ directory
#
# WHY COPY THIS LAST?
# - Source code changes frequently
# - Dependency installation (previous step) changes rarely
# - By copying code last, we maximize Docker cache efficiency
COPY . .

# =================================================================
# EXPOSE PORT
# =================================================================
# EXPOSE documents which port the container listens on
# This is METADATA only - it doesn't actually open the port
# The port is opened when you run: docker run -p 4000:4000
#
# PURPOSE:
# - Documentation for developers
# - Used by docker compose to map ports
# - Tells Docker which ports the container expects to use
#
# NOTE: This must match the PORT in index.js (4000)
EXPOSE 4000

# =================================================================
# STARTUP COMMAND
# =================================================================
# CMD defines the command to run when container starts
# This is the ENTRYPOINT - what actually runs your application
#
# SYNTAX:
# CMD ["executable", "parameter1", "parameter2"]
# This is "exec form" - preferred over "shell form"
#
# WHAT IT DOES:
# - Runs: npm start
# - Which executes the "start" script from package.json
# - Which runs: node index.js
# - Which starts our Express server
#
# DIFFERENCE FROM RUN:
# - RUN executes during IMAGE BUILD (like npm install)
# - CMD executes when CONTAINER STARTS (like node index.js)
CMD ["npm", "start"]

# =================================================================
# BUILD & RUN COMMANDS (for reference)
# =================================================================
# To build this image:
# docker build -t express-server .
#
# To run the container:
# docker run -p 4000:4000 express-server
#
# To run with docker-compose:
# docker compose up --build
# =================================================================
