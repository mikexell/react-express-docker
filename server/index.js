// server/index.js
// =================================================================
// BACKEND SERVER - Express.js API
// =================================================================
// This file sets up a simple Express server that will:
// 1. Handle HTTP requests from the frontend (React app)
// 2. Serve API endpoints (RESTful API)
// 3. Enable CORS to allow cross-origin requests
// =================================================================

// Import the Express framework - the foundation for building web servers in Node.js
import express from "express";

// Import CORS (Cross-Origin Resource Sharing) middleware
// CORS is needed because the frontend (port 3000) and backend (port 4000) 
// run on different ports/origins, and browsers block requests between different origins by default
import cors from "cors";

// =================================================================
// INITIALIZE EXPRESS APPLICATION
// =================================================================
// Create an Express application instance
// Think of this as creating your web server object
const app = express();

// =================================================================
// MIDDLEWARE SETUP
// =================================================================
// Middleware functions are like filters that process requests before they reach your routes

// 1. JSON Middleware
// This middleware automatically parses incoming JSON data in request bodies
// Without this, you couldn't receive JSON data from the frontend
// Example: When frontend sends { "name": "John" }, this converts it to a JavaScript object
app.use(express.json());

// 2. CORS Middleware
// Enable CORS for ALL origins (any website can call this API)
// 
// HOW CORS WORKS:
// - Browser makes request from http://localhost:3000 (frontend)
// - To http://localhost:4000/api/message (backend)
// - Browser sees different ports = different origins
// - Browser blocks the request for security (Same-Origin Policy)
// - But with cors() enabled, server says "I allow requests from other origins"
// - Browser then allows the request to proceed
//
// SECURITY NOTE FOR PRODUCTION:
// In production, you should restrict CORS to specific domains only:
// app.use(cors({ 
//   origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
//   credentials: true 
// }));
app.use(cors());

// =================================================================
// API ROUTES / ENDPOINTS
// =================================================================
// Routes define what happens when someone visits a specific URL

// GET endpoint at /api/message
// This is a simple API endpoint that returns a JSON response
// 
// BREAKDOWN:
// - app.get() = Define a route that responds to GET requests
// - "/api/message" = The URL path (full URL: http://localhost:4000/api/message)
// - (req, res) => {} = Callback function that runs when this route is accessed
//   - req (request) = Contains data sent by the client (headers, query params, body, etc.)
//   - res (response) = Object used to send data back to the client
app.get("/api/message", (req, res) => {
  // res.json() sends a JSON response to the client
  // The frontend will receive this object: { message: "Hello from chaicode server" }
  // 
  // HOW IT WORKS:
  // 1. Frontend calls: fetch("/api/message")
  // 2. This endpoint gets triggered
  // 3. Server responds with JSON: { message: "Hello from chaicode server" }
  // 4. Frontend receives and displays it
  res.json({ message: "Hello from chaicode server" });
});

// Example of additional routes you might add:
// 
// POST endpoint - for creating data
// app.post("/api/data", (req, res) => {
//   const data = req.body; // Access data sent from frontend
//   console.log("Received data:", data);
//   res.json({ success: true, received: data });
// });
//
// GET endpoint with URL parameters
// app.get("/api/user/:id", (req, res) => {
//   const userId = req.params.id; // Access URL parameter
//   res.json({ userId, name: "John Doe" });
// });

// =================================================================
// SERVER CONFIGURATION & STARTUP
// =================================================================

// Define the port number the server will listen on
// process.env.PORT allows environment variables to override the default
// This is important for Docker and cloud deployments where port might be assigned dynamically
// If no environment variable is set, use port 4000 as default
const PORT = process.env.PORT || 4000;

// Start the server and listen for incoming requests
// 
// IMPORTANT FOR DOCKER:
// - "0.0.0.0" means "listen on all network interfaces"
// - This is REQUIRED for Docker containers to accept external connections
// - Without "0.0.0.0", Docker container would only accept localhost connections
//   and the frontend container couldn't communicate with it
// - "localhost" or "127.0.0.1" would only work within the same container
//
// HOW IT WORKS:
// 1. app.listen() starts the HTTP server
// 2. Server binds to port 4000 on all network interfaces (0.0.0.0)
// 3. Server begins accepting incoming HTTP requests
// 4. The callback function runs once server successfully starts
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
  console.log(`📡 API endpoint available at http://localhost:${PORT}/api/message`);
  console.log(`🐳 Listening on 0.0.0.0:${PORT} for Docker compatibility`);
});

// =================================================================
// DEBUGGING TIPS:
// =================================================================
// 1. Check if server is running: Visit http://localhost:4000/api/message in browser
// 2. Check Docker logs: docker compose logs backend
// 3. Test with curl: curl http://localhost:4000/api/message
// 4. Test with Postman: Send GET request to http://localhost:4000/api/message
// =================================================================
