import { ReactNode } from "react";
import ToggleContext from "./ToggleContext";
import useToggle from "../hooks/useToggle";

export const ToggleProvider = ({ children }: { children: ReactNode }) => {
  const [openMenu, setOpenMenu] = useToggle(false);
  const [logoutModal, setLogoutModal] = useToggle(false);
  const [paymentModal, setPaymentModal] = useToggle(false);
  const [lockMenu, setLockMenu] = useToggle(true);

  return (
    <ToggleContext.Provider
      value={{ logoutModal, setLogoutModal, openMenu, setOpenMenu, paymentModal, setPaymentModal, lockMenu, setLockMenu }}
    >
      {children}
    </ToggleContext.Provider>
  );
};
