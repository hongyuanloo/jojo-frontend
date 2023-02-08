import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeSetup } from "./components/theme/ThemeSetup";
import { AuthContextProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeSetup>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeSetup>
  </React.StrictMode>
);
