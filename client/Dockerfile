# client/Dockerfile
# =================================================================
# MULTI-STAGE DOCKER BUILD FOR REACT FRONTEND
# =================================================================
# This Dockerfile uses a multi-stage build pattern:
# Stage 1: Build the React app (needs Node.js and npm)
# Stage 2: Serve with nginx (only needs static files)
# 
# BENEFITS:
# - Final image is much smaller (nginx + static files only)
# - Build tools and source code aren't in production image
# - More secure (fewer dependencies = smaller attack surface)
# - Faster deployments (smaller image = faster transfer)
# =================================================================

# =================================================================
# STAGE 1: BUILD STAGE
# =================================================================
# This stage compiles and bundles the React application

# FROM with AS creates a named build stage
# node:22-alpine = Node.js 22 on Alpine Linux (lightweight)
# AS build = Names this stage "build" so we can reference it later
FROM node:22-alpine AS build

# Set working directory inside container
# All subsequent commands run from this directory
WORKDIR /app

# =================================================================
# DEPENDENCY INSTALLATION (Leveraging Docker Layer Caching)
# =================================================================
# Copy package files FIRST before copying source code
# This is a critical optimization technique
#
# WHY THIS ORDER MATTERS:
# Docker caches each instruction as a "layer"
# If files haven't changed, Docker reuses the cached layer
# package.json changes less frequently than source code
# So we copy and install dependencies first
#
# SCENARIO 1: You change App.jsx
# - package.json hasn't changed
# - Docker reuses cached "npm install" layer (saves 1-2 minutes!)
# - Only rebuilds from COPY . . onwards
#
# SCENARIO 2: You add a new dependency
# - package.json changed
# - Docker invalidates cache from this point
# - Reruns npm install (necessary)
# - Rebuilds everything after
COPY package*.json ./

# Install ALL dependencies (including devDependencies)
# We need devDependencies for the build process:
# - vite (build tool)
# - @vitejs/plugin-react (React transformation)
# - Other build-time tools
#
# NOTE: We DON'T use --production here because we need dev tools to build
# The final image (Stage 2) won't include these anyway
RUN npm install

# =================================================================
# COPY SOURCE CODE
# =================================================================
# Now copy all application source files
# COPY . . means: copy everything from client/ folder to /app in container
#
# FILES COPIED:
# - src/ (React components)
# - index.html (HTML entry point)
# - vite.config.js (build configuration)
# - All other project files
#
# EXCLUDED (via .dockerignore):
# - node_modules (we already npm installed)
# - .git (version control not needed)
# - .env files (secrets should not be in image)
COPY . .

# =================================================================
# BUILD THE APPLICATION
# =================================================================
# Run the build command defined in package.json
# This executes: vite build
#
# WHAT HAPPENS DURING BUILD:
# 1. Vite reads vite.config.js
# 2. Vite processes index.html
# 3. Vite compiles JSX to JavaScript (via @vitejs/plugin-react)
# 4. Vite bundles all JavaScript modules together
# 5. Vite optimizes code (minification, tree-shaking)
# 6. Vite generates hashed filenames (for caching)
# 7. Vite outputs everything to /app/dist folder
#
# OUTPUT STRUCTURE (dist folder):
# /app/dist/
# ├── index.html (references bundled JS/CSS)
# ├── assets/
# │   ├── index-[hash].js (bundled JavaScript)
# │   ├── index-[hash].css (bundled CSS)
# │   └── [other assets]
#
# WHY HASHED FILENAMES?
# - index-abc123.js instead of index.js
# - When code changes, hash changes
# - Browsers cache based on filename
# - New hash = browser downloads new file
# - Old hash = browser uses cached version
# - Perfect cache invalidation!
RUN npm run build

# At this point: /app/dist contains production-ready static files
# This stage has: Node.js + npm + node_modules + source + dist (~500MB+)
# We only need the dist folder (~2MB)
# That's where Stage 2 comes in...

# =================================================================
# STAGE 2: PRODUCTION STAGE
# =================================================================
# This stage creates the final, minimal production image

# Start fresh with nginx base image
# nginx:stable-alpine = nginx web server on Alpine Linux
# This image is only ~25MB (compared to ~150MB for node:alpine)
#
# WHAT IS NGINX?
# - High-performance web server
# - Can serve static files (HTML, CSS, JS, images)
# - Can act as reverse proxy (forward requests to other servers)
# - Much faster than Node.js for serving static content
# - Industry standard for production deployments
FROM nginx:stable-alpine

# =================================================================
# CLEAN UP DEFAULT NGINX CONTENT
# =================================================================
# nginx image comes with default HTML content
# We need to remove it to avoid conflicts
#
# /usr/share/nginx/html/ is nginx's default content directory
# rm -rf removes everything inside
RUN rm -rf /usr/share/nginx/html/*

# =================================================================
# COPY BUILT STATIC FILES FROM BUILD STAGE
# =================================================================
# COPY --from=build means: copy from the "build" stage (Stage 1)
# We're taking ONLY the compiled dist folder, leaving everything else behind
#
# SYNTAX BREAKDOWN:
# COPY --from=<stage-name> <source-in-stage> <destination-in-current-stage>
#
# SOURCE: /app/dist (from build stage)
# DESTINATION: /usr/share/nginx/html (nginx's default serving directory)
#
# WHAT'S IN /app/dist?
# - index.html (main HTML file)
# - assets/index-[hash].js (bundled JavaScript)
# - assets/index-[hash].css (bundled CSS)
# - Any images, fonts, or other static assets
#
# RESULT: Final image contains ONLY:
# - nginx (~25MB)
# - Static files (~2MB)
# - Total: ~27MB
# 
# Compare to if we included Node.js: ~500MB+
# That's a 95% size reduction!
COPY --from=build /app/dist /usr/share/nginx/html

# =================================================================
# COPY CUSTOM NGINX CONFIGURATION
# =================================================================
# Replace nginx's default configuration with our custom config
# Our config includes:
# - Serving static files
# - SPA routing support (fallback to index.html)
# - API proxying to backend container
# - Performance optimizations (gzip)
#
# DESTINATION EXPLAINED:
# /etc/nginx/conf.d/ = nginx's configuration directory
# default.conf = default server configuration file
# nginx automatically loads all .conf files from this directory
COPY nginx.conf /etc/nginx/conf.d/default.conf

# =================================================================
# EXPOSE PORT
# =================================================================
# Document that container listens on port 80
# Port 80 is the standard HTTP port
#
# NOTE: This is documentation/metadata only
# The actual port mapping happens when running the container:
# docker run -p 80:80 (maps host port 80 to container port 80)
# docker run -p 8080:80 (maps host port 8080 to container port 80)
EXPOSE 80

# =================================================================
# START NGINX
# =================================================================
# CMD defines the command to run when container starts
# This starts the nginx web server
#
# SYNTAX BREAKDOWN:
# nginx = the nginx executable
# -g = sets global directives
# "daemon off;" = run nginx in foreground
#
# WHY "daemon off;"?
# - By default, nginx runs as a background daemon
# - Docker needs the main process to run in foreground
# - If nginx runs in background, Docker thinks container stopped
# - "daemon off;" keeps nginx in foreground so container stays alive
#
# WHAT HAPPENS WHEN CONTAINER STARTS:
# 1. Docker runs this CMD
# 2. nginx starts and reads /etc/nginx/conf.d/default.conf
# 3. nginx begins serving files from /usr/share/nginx/html
# 4. nginx listens on port 80 for HTTP requests
# 5. nginx proxies /api/* requests to backend container
# 6. Container runs until nginx is stopped
CMD ["nginx", "-g", "daemon off;"]

# =================================================================
# BUILD & RUN COMMANDS (for reference)
# =================================================================
#
# Build this image:
# docker build -t react-frontend .
#
# Run the container:
# docker run -p 80:80 react-frontend
# Then visit: http://localhost
#
# Run with docker-compose (recommended):
# docker compose up --build
#
# View running containers:
# docker ps
#
# View logs:
# docker logs <container-id>
# docker compose logs client
#
# Stop container:
# docker stop <container-id>
# docker compose down
#
# =================================================================
# OPTIMIZATION TIPS
# =================================================================
#
# 1. Use .dockerignore to exclude unnecessary files
# 2. Order instructions from least to most frequently changing
# 3. Combine RUN commands to reduce layers (if needed)
# 4. Use specific base image versions (not 'latest')
# 5. Multi-stage builds for minimal production images
# 6. Consider using nginx:alpine for even smaller image
# 7. Implement health checks for production
#
# =================================================================
# SECURITY CONSIDERATIONS
# =================================================================
#
# 1. Don't include .env files or secrets in image
# 2. Run as non-root user (nginx runs as nginx user by default)
# 3. Keep base images updated (security patches)
# 4. Scan images for vulnerabilities: docker scan
# 5. Use specific versions, not 'latest' tags
# 6. Minimize installed packages (fewer dependencies = smaller attack surface)
#
# =================================================================
