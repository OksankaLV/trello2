import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./utils/fonts.scss";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/hooks";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
