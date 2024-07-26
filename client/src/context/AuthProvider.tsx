import { useQuery } from "@apollo/client";
import { PropsWithChildren, useEffect, useState } from "react";
import { GET_USER } from "../components/graphql/auth";
import useLocalStorage from "../hooks/useLocalStorage";
import AuthContext from "./AuthContext";

type User = {
  id: string;
  username: string;
  email: string;
  isActivated: boolean;
};

export const AuthProvider = ({ children }: PropsWithChildren<object>) => {
  const [loggedUser, setLoggedUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  const [user, setUser] = useState<User | null>(null);

  const { data } = useQuery(GET_USER, {
    variables: { username: loggedUser },
    skip: !token,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  useEffect(() => {
    if (data && data.user) {
      setUser(data.user);
    }
  }, [data]);

  return <AuthContext.Provider value={{ loggedUser, setLoggedUser, setToken, user }}>{children}</AuthContext.Provider>;
};
