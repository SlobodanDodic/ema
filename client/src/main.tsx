import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import router from "./Router.tsx";

import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from "@apollo/client";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";
import { ToastContainer } from "react-toastify";

const removeTypenameLink = removeTypenameFromVariables();
const httpLink = new HttpLink({ uri: import.meta.env.VITE_HTTP_LINK });
const link = from([removeTypenameLink, httpLink]);

const client = new ApolloClient({
  link,
  uri: import.meta.env.VITE_DATABASE_URL,
  // cache: new InMemoryCache(),
  cache: new InMemoryCache({
    typePolicies: {
      Employee: {
        fields: {
          healthCareMembers: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            merge(_existing = [], incoming) {
              // Custom merge logic: replace existing members with incoming ones
              return incoming;
            },
          },
          fitpassMembers: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            merge(_existing = [], incoming) {
              // Custom merge logic: replace existing members with incoming ones
              return incoming;
            },
          },
        },
      },
    },
  }),
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
