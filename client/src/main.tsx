import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.tsx";
import router from "./Router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider isSignedIn={false}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
