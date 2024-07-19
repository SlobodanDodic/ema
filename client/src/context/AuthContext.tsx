import React, { createContext } from "react";

type User = {
  id: string;
  username: string;
  email: string;
  isActivated: boolean;
};

type AuthContextType = {
  loggedUser: string | null;
  setLoggedUser: React.Dispatch<React.SetStateAction<string | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
