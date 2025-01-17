import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App, { appRouter } from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./utils/store.js";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);
