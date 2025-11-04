# 🚀 QUICK START GUIDE

## Prerequisites
Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## 📦 Installation Steps

### Option 1: Development Mode (No Docker)
Perfect for local development with hot reloading.

#### Step 1: Install Backend Dependencies
```powershell
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start the backend server
npm start
```
✅ Backend should now be running at http://localhost:4000

#### Step 2: Install Frontend Dependencies (New Terminal)
```powershell
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```
✅ Frontend should now be running at http://localhost:3000

#### Step 3: Test the Application
1. Open your browser and go to http://localhost:3000
2. You should see: "Full-stack Deploy Demo"
3. Message from backend should display: "Hello from chaicode server"

---

### Option 2: Production Mode (With Docker)
This is how the app runs in production.

#### Step 1: Build and Start Containers
```powershell
# From project root directory
docker compose up --build
```

This command will:
1. ✅ Build the backend Docker image (Express server)
2. ✅ Build the frontend Docker image (React + Nginx)
3. ✅ Start both containers
4. ✅ Create a network for communication

#### Step 2: Access the Application
- **Frontend**: http://localhost
- **Backend API**: http://localhost:4000/api/message

#### Step 3: Stop the Application
```powershell
# Stop and remove containers
docker compose down

# Stop and remove containers + volumes
docker compose down -v
```

---

## 🧪 Testing the Setup

### Test Backend API (Postman or Browser)
1. Open: http://localhost:4000/api/message
2. Expected response:
   ```json
   {
     "message": "Hello from chaicode server"
   }
   ```

### Test Frontend
1. Open: http://localhost (or http://localhost:3000 in dev mode)
2. You should see the message from the backend displayed on the page

---

## 📝 Development Workflow

### Making Changes to Backend
1. Edit files in `server/` directory
2. **Dev Mode**: Changes auto-reload (if using `npm run dev`)
3. **Docker Mode**: Rebuild with `docker compose up --build`

### Making Changes to Frontend
1. Edit files in `client/src/` directory
2. **Dev Mode**: Changes auto-reload (Vite HMR)
3. **Docker Mode**: Rebuild with `docker compose up --build`

---

## 🐛 Common Issues & Solutions

### Issue 1: Port 80 Already in Use
**Error**: `Bind for 0.0.0.0:80 failed: port is already allocated`

**Solution**: Change the port in `docker-compose.yml`
```yaml
services:
  client:
    ports:
      - "8080:80"  # Changed from 80:80
```
Then access at http://localhost:8080

---

### Issue 2: Cannot Connect to Backend
**Error**: "Failed to fetch message" or "Network error"

**Solutions**:
1. Check if backend is running:
   ```powershell
   docker compose ps
   # OR in dev mode, check terminal running npm start
   ```

2. Check backend logs:
   ```powershell
   docker compose logs backend
   ```

3. Test backend directly:
   ```powershell
   curl http://localhost:4000/api/message
   ```

---

### Issue 3: node_modules Issues
**Error**: Various dependency errors

**Solution**: Clean install
```powershell
# Backend
cd server
rm -rf node_modules package-lock.json
npm install

# Frontend
cd client
rm -rf node_modules package-lock.json
npm install
```

---

### Issue 4: Docker Build Fails
**Error**: Build errors during `docker compose up --build`

**Solutions**:
1. Clear Docker cache:
   ```powershell
   docker compose build --no-cache
   ```

2. Remove all images and rebuild:
   ```powershell
   docker compose down --rmi all
   docker compose up --build
   ```

---

## 📊 Useful Commands

### Docker Commands
```powershell
# View running containers
docker compose ps

# View logs (all services)
docker compose logs

# View logs (specific service)
docker compose logs backend
docker compose logs client

# Follow logs in real-time
docker compose logs -f

# Restart a service
docker compose restart backend

# Execute command in container
docker compose exec backend sh
docker compose exec client sh

# Stop services
docker compose stop

# Start stopped services
docker compose start

# Remove everything
docker compose down -v --rmi all
```

### npm Commands
```powershell
# Install dependencies
npm install

# Start backend
npm start               # Production mode
npm run dev            # Development mode (with --watch)

# Start frontend
npm run dev            # Development server
npm run build          # Build for production
npm run preview        # Preview production build
```

---

## 🎯 Next Steps

After getting the basic setup running:

1. **Explore the Code**
   - Read comments in each file
   - Understand the flow: Browser → Nginx → Express
   - Experiment with changes

2. **Add Features**
   - Add new API endpoints in `server/index.js`
   - Add new React components in `client/src/`
   - Add environment variables

3. **Deploy**
   - Push to GitHub
   - Deploy to cloud (AWS, Google Cloud, Azure, DigitalOcean)
   - Set up CI/CD pipeline

---

## 📚 Learning Path

### Beginner
1. Start with development mode (no Docker)
2. Understand how React fetches data from Express
3. Read comments in `App.jsx` and `index.js`

### Intermediate
1. Learn Docker basics
2. Understand multi-stage builds
3. Explore nginx configuration

### Advanced
1. Optimize Docker images
2. Implement CI/CD
3. Add monitoring and logging
4. Scale with Kubernetes

---

## 💡 Tips

1. **Always read the inline comments** - They explain everything in detail
2. **Use Docker logs** - They're your best friend for debugging
3. **Test incrementally** - Get backend working first, then frontend, then Docker
4. **Keep it simple** - Don't add complexity until basics work
5. **Experiment** - Break things and fix them - that's how you learn!

---

## 🆘 Getting Help

If you're stuck:
1. Check this SETUP.md file
2. Read the comments in the relevant files
3. Check Docker logs: `docker compose logs`
4. Search for the error message
5. Open an issue on GitHub

---

**Happy Coding! 🎉**
