import { createContext } from "react";

interface ToggleContextType {
  isLogoutModalOpen: boolean;
  toggleLogoutModal: () => void;
  openMenu: boolean;
  setOpenMenu: () => void;
}

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

export default ToggleContext;
