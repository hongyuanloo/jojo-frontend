import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { ThemeSetup } from "./components/theme/ThemeSetup";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeSetup>
      {/* provide redux store for global use */}
      <Provider store={store}>
        {/* render UI only after redux persisted data is available to redux store */}
        <PersistGate loading={<h1>Loading Redux ..</h1>} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ThemeSetup>
  </React.StrictMode>
);
