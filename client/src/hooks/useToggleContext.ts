import { useContext } from "react";
import ToggleContext from "../context/ToggleContext";

export const useToggleContext = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error("useToggleContext must be used within a ToggleProvider");
  }
  return context;
};
