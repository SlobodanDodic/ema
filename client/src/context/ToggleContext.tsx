import { createContext } from "react";

interface ToggleContextType {
  logoutModal: boolean;
  setLogoutModal: () => void;
  openMenu: boolean;
  setOpenMenu: () => void;
  paymentModal: boolean;
  setPaymentModal: () => void;
}

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

export default ToggleContext;
