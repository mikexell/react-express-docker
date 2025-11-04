// client/src/App.jsx
// =================================================================
// MAIN APPLICATION COMPONENT
// =================================================================
// This is the root component of your React application
// It demonstrates:
// 1. Fetching data from a backend API
// 2. Managing state with useState
// 3. Handling side effects with useEffect
// 4. Rendering dynamic content
// =================================================================

// Import React hooks
// useState: Manages component state (data that can change)
// useEffect: Handles side effects (API calls, subscriptions, timers, etc.)
import React, { useEffect, useState } from "react";

// =================================================================
// APP COMPONENT (Function Component)
// =================================================================
// In modern React, we use function components instead of class components
// Function components are simpler, cleaner, and support hooks
export default function App() {
  // ===============================================================
  // STATE MANAGEMENT WITH useState
  // ===============================================================
  // useState is a React hook that lets you add state to function components
  //
  // SYNTAX: const [value, setValue] = useState(initialValue)
  // - value: Current state value (read-only, don't modify directly)
  // - setValue: Function to update the state
  // - initialValue: Starting value for the state
  //
  // HOW IT WORKS:
  // 1. Component renders with initial value "loading..."
  // 2. When setValue is called, React:
  //    - Updates the state
  //    - Re-renders the component
  //    - Shows new value in UI
  //
  // WHY "loading..." as initial value?
  // - User sees immediate feedback while API call is in progress
  // - Better UX than showing nothing or "undefined"
  const [message, setMessage] = useState("loading...");

  // ===============================================================
  // SIDE EFFECTS WITH useEffect
  // ===============================================================
  // useEffect is a React hook for handling side effects
  // Side effects = code that affects things outside your component
  // Examples: API calls, subscriptions, DOM manipulation, timers
  //
  // SYNTAX: useEffect(callback, dependencies)
  // - callback: Function containing the side effect code
  // - dependencies: Array that controls when the effect runs
  //
  // DEPENDENCY ARRAY BEHAVIOR:
  // - [] (empty): Run once when component mounts (our case)
  // - [value]: Run when 'value' changes
  // - undefined: Run after every render (usually not desired)
  //
  // WHY USE useEffect FOR API CALLS?
  // - Can't use async/await directly in component body
  // - Separates side effects from render logic
  // - Provides cleanup mechanism (for subscriptions, timers, etc.)
  useEffect(() => {
    // =============================================================
    // FETCHING DATA FROM BACKEND API
    // =============================================================
    // fetch() is the modern browser API for making HTTP requests
    // It returns a Promise that resolves to the Response object
    //
    // REQUEST FLOW:
    // 1. Browser sends GET request to /api/message
    // 2. In development: Vite proxy forwards to localhost:4000
    // 3. In production: nginx proxy forwards to backend container
    // 4. Backend (Express) responds with JSON
    // 5. Response travels back through proxy
    // 6. Frontend receives response
    //
    // WHY USE RELATIVE PATH "/api/message"?
    // - Works in both development and production
    // - Proxies handle the routing (see vite.config.js and nginx.conf)
    // - Avoids hardcoding backend URL
    // - Prevents CORS issues
    //
    // ALTERNATIVE (not recommended):
    // fetch("http://localhost:4000/api/message") 
    // - Only works in development
    // - Fails in Docker (containers can't access host localhost)
    // - Requires CORS configuration
    fetch("/api/message")
      // ===========================================================
      // PROMISE CHAIN - HANDLING ASYNC RESPONSES
      // ===========================================================
      // .then() handles the Promise resolution
      // Each .then() returns a new Promise, allowing chaining
      
      // STEP 1: Check response status and parse JSON
      .then((res) => {
        // res = Response object from fetch
        // Contains: status, headers, body (as a ReadableStream)
        
        // Error handling: Check if request was successful
        // res.ok is true for status codes 200-299
        // For 404, 500, etc., res.ok is false
        if (!res.ok) {
          // throw creates an error that jumps to .catch()
          // This ensures errors are handled consistently
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        // res.json() parses the response body as JSON
        // IMPORTANT: Response body is a ReadableStream (binary data)
        // We must convert it to JavaScript objects
        // res.json() returns a Promise that resolves to parsed data
        //
        // WHAT HAPPENS:
        // Server sends: '{"message": "Hello from chaicode server"}'
        // res.json() converts to: { message: "Hello from chaicode server" }
        return res.json();
      })
      
      // STEP 2: Use the parsed data
      .then((data) => {
        // data = JavaScript object: { message: "Hello from chaicode server" }
        // Extract just the message property
        // Update state with the message
        //
        // WHAT HAPPENS AFTER setMessage():
        // 1. React updates the 'message' state
        // 2. React re-renders the component
        // 3. UI updates to show the new message
        // 4. User sees "Hello from chaicode server" instead of "loading..."
        setMessage(data.message);
      })
      
      // STEP 3: Handle errors
      .catch((err) => {
        // .catch() handles any errors in the Promise chain
        // Errors can occur from:
        // - Network issues (no internet, server down)
        // - Invalid JSON response
        // - throw new Error() in .then()
        // - CORS issues
        //
        // BEST PRACTICE:
        // - Don't just console.log errors
        // - Show user-friendly error messages
        // - Update UI to reflect error state
        console.error("Error fetching message:", err);
        setMessage("Failed to fetch message: " + err.message);
      });
    
    // ===========================================================
    // CLEANUP FUNCTION (Optional, not used here)
    // ===========================================================
    // useEffect can return a cleanup function that runs:
    // - Before re-running the effect (if dependencies change)
    // - When component unmounts (is removed from DOM)
    //
    // Example use cases:
    // return () => {
    //   // Cancel pending API requests
    //   // Clear timers: clearTimeout(timerId)
    //   // Unsubscribe from services
    //   // Remove event listeners
    // };
  }, []); 
  // Empty dependency array [] means:
  // - Run effect once when component mounts
  // - Don't run again on re-renders
  // - Perfect for one-time data fetching
  //
  // If we had [someValue]:
  // - Run effect when component mounts
  // - Run again whenever someValue changes

  // ===============================================================
  // RENDER (RETURN JSX)
  // ===============================================================
  // This function returns JSX that describes what to display
  // React converts this JSX into real DOM elements
  return (
    // =============================================================
    // INLINE STYLES (CSS-in-JS)
    // =============================================================
    // The style prop accepts a JavaScript object
    // Property names are camelCase (padding, not padding)
    // Values are strings (with units) or numbers
    //
    // WHY INLINE STYLES?
    // Pros:
    // - Component-scoped (no global CSS conflicts)
    // - Dynamic styling with JavaScript
    // - No separate CSS file needed
    // 
    // Cons:
    // - No pseudo-classes (:hover, :focus)
    // - No media queries
    // - Less performant for large apps
    //
    // ALTERNATIVES:
    // - CSS Modules: import styles from './App.module.css'
    // - Styled Components: const Div = styled.div`...`
    // - Tailwind CSS: <div className="p-5 font-sans">
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      {/* =========================================================
          STATIC CONTENT
          ========================================================= */}
      <h1>Full-stack Deploy Demo</h1>
      
      {/* =========================================================
          DYNAMIC CONTENT (State Rendering)
          =========================================================
          Curly braces {} let you embed JavaScript expressions in JSX
          {message} is replaced with the current value of message state
          
          RENDER TIMELINE:
          1. Initial render: Shows "loading..."
          2. useEffect runs: Fetches data
          3. setMessage() called: State updates
          4. Re-render: Shows "Hello from chaicode server"
          5. If error: Shows "Failed to fetch message: ..."
          ========================================================= */}
      <p>
        Message from backend: <strong>{message}</strong>
      </p>

      {/* =========================================================
          ADDITIONAL UI EXAMPLES (Optional)
          =========================================================
          You can extend this component with:
          
          - Loading indicator:
          {message === "loading..." && <div>Loading...</div>}
          
          - Error styling:
          <p style={{ color: message.includes("Failed") ? "red" : "green" }}>
            {message}
          </p>
          
          - Button to refetch:
          <button onClick={() => setMessage("loading...")}>
            Refresh
          </button>
          
          - Display timestamp:
          <p>Last updated: {new Date().toLocaleTimeString()}</p>
          ========================================================= */}
    </div>
  );
}

// =================================================================
// COMPONENT LIFECYCLE SUMMARY
// =================================================================
//
// 1. MOUNT (Component appears on screen):
//    - Component function runs
//    - State initialized: message = "loading..."
//    - JSX returned and rendered
//    - useEffect runs after render
//    - API call starts
//
// 2. UPDATE (State changes):
//    - API response arrives
//    - setMessage() called with new value
//    - React schedules re-render
//    - Component function runs again
//    - New JSX returned with updated message
//    - React updates DOM (only changed parts)
//
// 3. UNMOUNT (Component removed from screen):
//    - Component removed from DOM
//    - Cleanup function runs (if provided in useEffect)
//    - State is destroyed
//
// =================================================================

// =================================================================
// DEBUGGING WITH REACT DEVTOOLS
// =================================================================
//
// Install React Developer Tools browser extension
// Then you can:
// - Inspect component tree
// - View current state: message value
// - See props passed to components
// - Track which components re-render
// - Profile performance
//
// In console:
// - console.log(message) to see state changes
// - console.log("Component rendered") to track renders
// - Use debugger; statement to pause execution
// =================================================================

// =================================================================
// COMMON PATTERNS & BEST PRACTICES
// =================================================================
//
// 1. LOADING STATE:
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);
//
// fetch("/api/message")
//   .then(res => res.json())
//   .then(data => {
//     setMessage(data.message);
//     setLoading(false);
//   })
//   .catch(err => {
//     setError(err.message);
//     setLoading(false);
//   });
//
// 2. ASYNC/AWAIT SYNTAX:
// useEffect(() => {
//   async function fetchData() {
//     try {
//       const res = await fetch("/api/message");
//       if (!res.ok) throw new Error("HTTP error");
//       const data = await res.json();
//       setMessage(data.message);
//     } catch (err) {
//       setMessage("Error: " + err.message);
//     }
//   }
//   fetchData();
// }, []);
//
// 3. ABORT CONTROLLER (Cancel requests on unmount):
// useEffect(() => {
//   const controller = new AbortController();
//   
//   fetch("/api/message", { signal: controller.signal })
//     .then(res => res.json())
//     .then(data => setMessage(data.message))
//     .catch(err => {
//       if (err.name !== "AbortError") {
//         setMessage("Error: " + err.message);
//       }
//     });
//   
//   return () => controller.abort();
// }, []);
// =================================================================
