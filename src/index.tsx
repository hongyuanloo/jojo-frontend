import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { ThemeSetup } from "./components/theme/ThemeSetup";
import { AuthContextProvider } from "./contexts/AuthContext";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeSetup>
      <AuthContextProvider>
        {/* provide redux store for global use */}
        <Provider store={store}>
          <App />
        </Provider>
      </AuthContextProvider>
    </ThemeSetup>
  </React.StrictMode>
);
