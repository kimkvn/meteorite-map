import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "@fontsource/monaspace-krypton/200.css";
import "@fontsource/monaspace-krypton/300.css";
import "@fontsource/monaspace-krypton/400.css";
import "@fontsource/monaspace-krypton/500.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
