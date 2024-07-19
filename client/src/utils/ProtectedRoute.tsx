import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext === undefined) {
      throw new Error("Protected component must be used within an AuthProvider");
    }

    if (!authContext?.loggedUser) {
      navigate("/login", { replace: true });
    }
  }, [authContext, navigate]);

  return authContext?.loggedUser && authContext?.user?.isActivated ? <>{children}</> : null;
}
