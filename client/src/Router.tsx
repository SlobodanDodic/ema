import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

import Root from "./pages/Root";
import NotFoundPage from "./pages/NotFoundPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import HealthCare from "./pages/HealthCare";
import Fitpass from "./pages/Fitpass";
import Payments from "./pages/Payments";
import Form from "./pages/Form";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage />, errorElement: <NotFoundPage /> },
  { path: "/register", element: <RegisterPage />, errorElement: <NotFoundPage /> },
  {
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/employees",
        element: (
          <ProtectedRoute>
            <Employees />
          </ProtectedRoute>
        ),
      },
      {
        path: "/health_care",
        element: (
          <ProtectedRoute>
            <HealthCare />
          </ProtectedRoute>
        ),
      },
      {
        path: "/fitpass",
        element: (
          <ProtectedRoute>
            <Fitpass />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payments",
        element: (
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        ),
      },
      {
        path: "/form",
        element: (
          <ProtectedRoute>
            <Form />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
