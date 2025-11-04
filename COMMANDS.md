# 🚀 Quick Command Reference

A handy cheat sheet for working with this project.

---

## 🐳 Docker Commands

### Basic Operations
```powershell
# Build and start all services
docker compose up --build

# Start in background (detached mode)
docker compose up -d

# Stop all services
docker compose down

# Stop and remove volumes
docker compose down -v

# Stop and remove images
docker compose down --rmi all

# Stop and remove everything
docker compose down -v --rmi all
```

### Viewing & Monitoring
```powershell
# View running containers
docker compose ps

# View all logs
docker compose logs

# View logs for specific service
docker compose logs backend
docker compose logs client

# Follow logs in real-time
docker compose logs -f
docker compose logs -f backend

# View last 100 lines
docker compose logs --tail=100
```

### Rebuilding & Restarting
```powershell
# Rebuild all services
docker compose build

# Rebuild without cache
docker compose build --no-cache

# Rebuild specific service
docker compose build backend

# Restart all services
docker compose restart

# Restart specific service
docker compose restart backend
```

### Accessing Containers
```powershell
# Execute command in running container
docker compose exec backend sh
docker compose exec client sh

# Run command without interactive shell
docker compose exec backend ls -la
docker compose exec client nginx -t

# Run as specific user
docker compose exec -u root backend sh
```

### Debugging
```powershell
# Inspect container
docker inspect fullstack_backend

# Check container stats (CPU, memory)
docker stats

# Check network
docker network ls
docker network inspect react-express-docker_default

# Remove unused resources
docker system prune
docker system prune -a  # Remove all unused images too
```

---

## 📦 npm Commands

### Backend (server/)
```powershell
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start server (production mode)
npm start

# Start with watch mode (auto-restart on changes)
npm run dev

# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Install new package
npm install express-rate-limit

# Uninstall package
npm uninstall package-name
```

### Frontend (client/)
```powershell
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server (with HMR)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run on specific port
npm run dev -- --port 3001

# Check for outdated packages
npm outdated

# Update dependencies
npm update
```

---

## 🔍 Testing & Debugging

### Testing Backend API
```powershell
# Using curl (PowerShell)
curl http://localhost:4000/api/message

# Using Invoke-WebRequest (PowerShell alternative)
Invoke-WebRequest -Uri http://localhost:4000/api/message

# Test from inside container
docker compose exec backend curl http://localhost:4000/api/message
```

### Testing Frontend
```powershell
# Access frontend
# Development: http://localhost:3000
# Production: http://localhost

# Test nginx configuration
docker compose exec client nginx -t

# Reload nginx without restart
docker compose exec client nginx -s reload

# Check if gzip is enabled
curl -H "Accept-Encoding: gzip" -I http://localhost
```

### Network Testing
```powershell
# Test backend from frontend container
docker compose exec client wget -qO- http://backend:4000/api/message

# Check DNS resolution
docker compose exec client nslookup backend

# List network connections
docker compose exec backend netstat -tuln
```

---

## 🛠️ Development Workflow

### Starting Development
```powershell
# Terminal 1: Start backend
cd server
npm install
npm start

# Terminal 2: Start frontend
cd client
npm install
npm run dev

# Access at http://localhost:3000
```

### Making Changes - Backend
```powershell
# 1. Edit server/index.js
# 2. Save file
# 3. Restart server: Ctrl+C then npm start
# OR use npm run dev for auto-restart

# With Docker:
# 1. Edit server/index.js
# 2. Rebuild: docker compose up --build backend
```

### Making Changes - Frontend
```powershell
# Development mode (auto-reload):
# 1. Edit client/src/App.jsx
# 2. Save file
# 3. Browser updates automatically (HMR)

# With Docker:
# 1. Edit client/src/App.jsx
# 2. Rebuild: docker compose up --build client
```

---

## 🧹 Cleanup Commands

### Remove Development Artifacts
```powershell
# Remove node_modules and package-lock.json
cd server
Remove-Item -Recurse -Force node_modules, package-lock.json

cd ../client
Remove-Item -Recurse -Force node_modules, package-lock.json

# Reinstall
cd server && npm install
cd ../client && npm install
```

### Docker Cleanup
```powershell
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune
docker image prune -a  # Remove all unused

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune

# Remove everything unused
docker system prune -a --volumes
```

---

## 🔧 Troubleshooting Commands

### Port Issues
```powershell
# Check what's using a port (PowerShell)
Get-NetTCPConnection -LocalPort 80
Get-NetTCPConnection -LocalPort 4000

# Kill process by port (if needed)
# Find PID first, then:
Stop-Process -Id <PID> -Force
```

### Docker Issues
```powershell
# Restart Docker Desktop
# (Use the Docker Desktop app)

# Check Docker status
docker version
docker info

# Reset Docker (nuclear option - removes everything)
# Settings → Troubleshoot → Clean / Purge data
```

### Permission Issues
```powershell
# Run as administrator (if needed)
# Right-click PowerShell → Run as Administrator

# Fix file permissions in container
docker compose exec -u root backend chown -R node:node /app
```

---

## 📊 Monitoring & Logs

### Real-time Monitoring
```powershell
# Watch logs in real-time
docker compose logs -f

# Watch specific service
docker compose logs -f backend

# Watch multiple services
docker compose logs -f backend client

# Resource usage
docker stats

# Disk usage
docker system df
```

### Log Analysis
```powershell
# Search logs for errors
docker compose logs | Select-String "error"

# Count occurrences
docker compose logs backend | Select-String "API" | Measure-Object -Line

# Export logs to file
docker compose logs > logs.txt
```

---

## 🚀 Production Deployment

### Build Production Images
```powershell
# Build all
docker compose build --no-cache

# Test production build locally
docker compose up

# Tag images for registry
docker tag fullstack_backend:latest myregistry/backend:v1.0
docker tag fullstack_frontend:latest myregistry/frontend:v1.0

# Push to registry
docker push myregistry/backend:v1.0
docker push myregistry/frontend:v1.0
```

### Environment Variables
```powershell
# Create .env file
echo "NODE_ENV=production" > .env
echo "PORT=4000" >> .env

# Use in docker-compose.yml
# env_file:
#   - .env
```

---

## 📝 Git Commands

### Basic Operations
```powershell
# Initialize repository (if not done)
git init

# Check status
git status

# Stage changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main
```

### Branches
```powershell
# Create new branch
git checkout -b feature/my-feature

# Switch branches
git checkout main

# List branches
git branch

# Merge branch
git merge feature/my-feature

# Delete branch
git branch -d feature/my-feature
```

---

## 🎯 Quick Start Checklist

### First Time Setup
```powershell
☐ Clone repository
☐ cd react-express-docker
☐ docker compose up --build
☐ Open http://localhost
☐ Verify message appears
```

### Development Session
```powershell
☐ cd server && npm install && npm start
☐ cd client && npm install && npm run dev
☐ Open http://localhost:3000
☐ Make changes and test
☐ Commit and push when done
```

### Before Committing
```powershell
☐ Test in development mode
☐ Test in production mode (Docker)
☐ Check for console errors
☐ Review changes: git diff
☐ Add files: git add .
☐ Commit: git commit -m "message"
☐ Push: git push
```

---

## 🆘 Emergency Commands

### Something's Broken
```powershell
# Stop everything
docker compose down

# Clean up
docker system prune -a --volumes

# Rebuild from scratch
docker compose build --no-cache
docker compose up

# If still broken, check logs
docker compose logs
```

### Start Fresh
```powershell
# Remove everything
docker compose down -v --rmi all
Remove-Item -Recurse -Force server/node_modules, client/node_modules

# Reinstall
cd server && npm install
cd ../client && npm install

# Rebuild Docker
docker compose up --build
```

---

## 📖 Documentation Links

### Quick Links
- README: [README.md](README.md)
- Setup Guide: [SETUP.md](SETUP.md)
- Architecture: [ARCHITECTURE.md](ARCHITECTURE.md)
- Summary: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

### External Resources
- [Docker Docs](https://docs.docker.com/)
- [React Docs](https://react.dev/)
- [Express Docs](https://expressjs.com/)
- [Vite Docs](https://vitejs.dev/)
- [Nginx Docs](https://nginx.org/en/docs/)

---

**💡 Pro Tip**: Bookmark this file for quick reference!

**Copy these commands to a notepad when working on the project.**
