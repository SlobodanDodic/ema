import { Outlet } from "react-router-dom";
import Menu from "../components/sidebar";
import Topbar from "../components/topbar";
import useToggle from "../hooks/useToggle";
import { useToggleContext } from "../hooks/useToggleContext";
import { useAuth } from "../hooks/useAuth";

export default function Root() {
  const [openMenu, setOpenMenu] = useToggle(false);
  const { isLogoutModalOpen, toggleLogoutModal } = useToggleContext();
  const authContext = useAuth();

  const handleLogout = () => {
    authContext?.setLoggedUser(null);
    authContext?.setToken(null);
    toggleLogoutModal();
  };

  return (
    <>
      {isLogoutModalOpen && (
        <div className="absolute z-40 flex flex-col items-center justify-center w-full max-w-sm px-10 py-6 -translate-x-1/2 border-2 rounded shadow-md -translate-y-1/3 border-oranje left-1/2 top-1/2 bg-marine shadow-midnight">
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
              onClick={() => toggleLogoutModal()}
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
        <Topbar toggleMenu={() => setOpenMenu()} openMenu={openMenu} />
      </nav>

      <Menu openMenu={openMenu} />

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
