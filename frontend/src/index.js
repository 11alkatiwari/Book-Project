import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // ✅ Only use BrowserRouter
import { Provider } from "react-redux";
import store from "./store/index.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ Add `.js` extension

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <Provider store={store}> {/* ✅ Wrap Provider around everything */}
     {/* ✅ BrowserRouter wraps App */}
      <App />
      </Provider>
    </BrowserRouter>
  
);
