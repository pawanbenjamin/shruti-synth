import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { StateProvider } from "./state";
import "./styles/style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>
);
