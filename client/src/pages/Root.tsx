import { Outlet } from "react-router-dom";
import Menu from "../components/sidebar";
import Topbar from "../components/topbar";
import { useToggleContext } from "../hooks/useToggleContext";
import { useAuth } from "../hooks/useAuth";

export default function Root() {
  const { logoutModal, setLogoutModal, openMenu, paymentModal } = useToggleContext();
  const authContext = useAuth();

  const handleLogout = () => {
    authContext?.setLoggedUser(null);
    authContext?.setToken(null);
    setLogoutModal();
  };

  return (
    <>
      {logoutModal && <div className="absolute top-0 left-0 z-50 w-full h-full bg-black/50" />}
      {paymentModal && <div className="absolute top-0 left-0 z-0 w-full h-full bg-black/50" />}

      {logoutModal && (
        <div className="absolute z-50 flex flex-col items-center justify-center w-full max-w-sm px-10 py-6 -translate-x-1/2 border-2 rounded shadow-md -translate-y-1/3 border-oranje left-1/2 top-1/2 bg-marine shadow-midnight">
          <h2 className="mb-4 text-center text-silver">Are you sure you want to logout?</h2>
          <div className="flex mb-3 mt-7">
            <button
              className="w-full px-4 py-1 font-medium tracking-wide text-center rounded me-4 text-midnight bg-silver hover:text-silver hover:bg-red-800"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              className="w-full px-4 py-1 font-medium tracking-wide text-center rounded text-midnight bg-silver hover:text-silver hover:bg-midnight"
              onClick={() => setLogoutModal()}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <nav
        className={`fixed top-0 z-40 flex items-center mt-4 justify-between mx-8 py-4 bg-silver ${
          openMenu
            ? "w-[calc(100%-4rem)] sm:w-[calc(100%-19rem)] sm:mx-16 sm:translate-x-52"
            : "w-[calc(100%-4rem)] translate-x-0"
        }`}
      >
        {paymentModal && <div className="absolute top-0 left-0 z-50 w-full h-full bg-black/50" />}

        <Topbar />
      </nav>

      <Menu />

      <main
        className={`mt-20 h-full mx-8 ${
          openMenu
            ? "w-[calc(100%-4rem)] sm:w-[calc(100%-19rem)] mt-24 sm:mx-16 sm:translate-x-52 z-50"
            : "w-[calc(100%-4rem)] translate-x-0 mt-24"
        }`}
      >
        <Outlet />
      </main>
    </>
  );
}
