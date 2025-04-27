import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";  // ✅ Import context

createRoot(document.getElementById("root")).render(
  <React.StrictMode>    
  <BrowserRouter>
    <AppContextProvider>  
      <App />
    </AppContextProvider>
  </BrowserRouter>
  </React.StrictMode>
);
