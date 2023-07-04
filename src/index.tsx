import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom"
import { SwitchContextProvider } from "./components/context/switchContext/SwitchContext";
import { UserContextProvider } from "./components/context/userContext/UserContext";
import { DbContextProvider } from "./components/context/dbContext/DbContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <DbContextProvider>
      <SwitchContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </SwitchContextProvider>
      </DbContextProvider>
    </Router>
  </React.StrictMode>
);