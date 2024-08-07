import { ReactNode } from "react";
import ToggleContext from "./ToggleContext";
import useToggle from "../hooks/useToggle";

export const ToggleProvider = ({ children }: { children: ReactNode }) => {
  const [isLogoutModalOpen, toggleLogoutModal] = useToggle(false);

  return <ToggleContext.Provider value={{ isLogoutModalOpen, toggleLogoutModal }}>{children}</ToggleContext.Provider>;
};
