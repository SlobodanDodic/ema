import { useState } from "react";
import { Outlet } from "react-router-dom";
import Menu from "../components/sidebar";
import Topbar from "../components/topbar";

export default function Root() {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <nav
        className={`fixed top-0 z-40 flex items-center mt-4 justify-between mx-8 py-4 bg-stone-50 ${
          openMenu
            ? "w-[calc(100%-4rem)] sm:w-[calc(100%-19rem)] sm:mx-16 sm:translate-x-52"
            : "w-[calc(100%-4rem)] translate-x-0"
        }`}
      >
        <Topbar toggleMenu={toggleMenu} openMenu={openMenu} />
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
