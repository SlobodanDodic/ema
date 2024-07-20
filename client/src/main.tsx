import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import router from "./Router.tsx";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";

const client = new ApolloClient({
  uri: import.meta.env.VITE_DATABASE_URL,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <ToastContainer autoClose={3000} pauseOnFocusLoss={false} pauseOnHover={false} theme="dark" />
        <RouterProvider router={router} />
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);
