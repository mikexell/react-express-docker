// client/src/main.jsx
// =================================================================
// REACT APPLICATION ENTRY POINT
// =================================================================
// This file is the bridge between HTML and React
// It mounts (attaches) your React app to the DOM
// =================================================================

// Import React library
// React is the core library that enables component-based UI development
import React from "react";

// Import createRoot from React DOM
// React DOM is the package that connects React to the browser's DOM
// createRoot is the modern API (React 18+) for mounting React apps
// 
// HISTORY:
// - Old way (React 17 and earlier): ReactDOM.render(<App />, element)
// - New way (React 18+): createRoot(element).render(<App />)
// 
// WHY THE CHANGE?
// - createRoot enables Concurrent Features (automatic batching, transitions)
// - Better performance and user experience
// - Prepares for future React features
import { createRoot } from "react-dom/client";

// Import the root App component
// This is your main React component that contains all other components
// Think of it as the "container" for your entire application
import App from "./App";

// =================================================================
// MOUNTING THE REACT APPLICATION
// =================================================================

// STEP 1: Find the DOM element where React will render
// -------------------------------------------------------
// document.getElementById("root") finds the <div id="root"> in index.html
// This is the "mounting point" or "container" where React takes over
//
// WHAT HAPPENS:
// 1. Browser loads index.html
// 2. Browser creates DOM with <div id="root"></div> (empty)
// 3. Browser loads this main.jsx file
// 4. This line finds that empty div
// 5. React will fill it with your App component

// STEP 2: Create a React root
// -------------------------------------------------------
// createRoot() creates a React root at the specified DOM element
// This root manages everything React-related inside that element
//
// TECHNICAL DETAILS:
// - Creates a "fiber tree" (React's internal representation of components)
// - Sets up event listeners for React's synthetic event system
// - Prepares for efficient updates and re-renders
const root = createRoot(document.getElementById("root"));

// STEP 3: Render the App component
// -------------------------------------------------------
// root.render() tells React to:
// 1. Take the App component
// 2. Convert it to real DOM elements
// 3. Insert those elements inside the root div
//
// JSX SYNTAX EXPLANATION:
// <App /> is JSX (JavaScript XML)
// - Looks like HTML but it's JavaScript
// - Gets compiled to: React.createElement(App)
// - Creates a React element (not a real DOM element yet)
//
// RENDER PROCESS:
// 1. React calls the App function component
// 2. App returns JSX describing the UI
// 3. React converts JSX to real DOM elements
// 4. React inserts those elements into <div id="root">
// 5. Browser displays the UI
root.render(<App />);

// =================================================================
// WHAT'S HAPPENING UNDER THE HOOD
// =================================================================
//
// When this file runs:
//
// 1. INITIAL RENDER:
//    index.html                This file                 Browser display
//    <div id="root"></div> --> createRoot + render --> <div id="root">
//                                                          <div>
//                                                            <h1>...</h1>
//                                                            <p>...</p>
//                                                          </div>
//                                                        </div>
//
// 2. WHEN STATE CHANGES (e.g., user clicks button):
//    State update --> React re-renders App --> Virtual DOM comparison
//                 --> Minimal DOM updates --> Browser updates only changed parts
//
// 3. PERFORMANCE:
//    - React doesn't re-render entire app on every change
//    - Uses Virtual DOM to calculate minimal required updates
//    - Only changes necessary DOM elements
//    - Much faster than manipulating DOM directly
//
// =================================================================

// =================================================================
// ADVANCED: React.StrictMode (Optional but Recommended)
// =================================================================
// You often see this wrapped in StrictMode:
//
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
//
// WHAT IS STRICTMODE?
// - Development-only tool that helps catch bugs
// - Intentionally double-invokes some functions to detect side effects
// - Warns about deprecated APIs
// - Does NOT affect production builds
//
// BENEFITS:
// - Identifies unsafe lifecycle methods
// - Warns about legacy string ref API usage
// - Warns about deprecated findDOMNode usage
// - Detects unexpected side effects
// - Ensures reusable state (React 18+ feature)
//
// WHY NOT INCLUDED HERE?
// - Keeping this example minimal for beginners
// - You can add it when you're comfortable with basics
// =================================================================

// =================================================================
// DEBUGGING TIPS
// =================================================================
//
// 1. If you see blank page:
//    - Open browser console (F12)
//    - Check for errors
//    - Verify <div id="root"> exists in index.html
//    - Ensure App.jsx has no syntax errors
//
// 2. React DevTools (Browser Extension):
//    - Install React Developer Tools
//    - Inspect component tree
//    - View props and state
//    - Debug performance issues
//
// 3. Common errors:
//    - "Target container is not a DOM element"
//      → Check id="root" matches in index.html
//    - "Cannot find module './App'"
//      → Ensure App.jsx exists in same folder
//    - Blank page with no errors
//      → Check if App component returns JSX
// =================================================================

// =================================================================
// ALTERNATIVE PATTERNS YOU MIGHT SEE
// =================================================================
//
// 1. One-liner version (common in simple apps):
// createRoot(document.getElementById("root")).render(<App />);
//
// 2. With error boundary:
// root.render(
//   <ErrorBoundary>
//     <App />
//   </ErrorBoundary>
// );
//
// 3. With React Router:
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );
//
// 4. With Redux Provider:
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );
// =================================================================
