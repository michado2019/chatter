import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom"
import { SwitchContextProvider } from "./components/context/switchContext/SwitchContext";
import { UserContextProvider } from "./components/context/userContext/UserContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <SwitchContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </SwitchContextProvider>
    </Router>
  </React.StrictMode>
);