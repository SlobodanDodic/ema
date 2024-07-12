import { createContext, PropsWithChildren, useState } from "react";

type User = {
  id: number;
};

const AuthContext = createContext<User | null>(null);

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean;
};

export default function AuthProvider({ children, isSignedIn }: AuthProviderProps) {
  const [user] = useState<User | null>(isSignedIn ? { id: 1 } : null);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export { AuthContext };
