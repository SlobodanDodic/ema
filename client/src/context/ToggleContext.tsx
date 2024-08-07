import { createContext } from "react";

interface ToggleContextType {
  isLogoutModalOpen: boolean;
  toggleLogoutModal: () => void;
}

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

export default ToggleContext;
