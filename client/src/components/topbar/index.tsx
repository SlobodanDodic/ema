import { IMenu } from "../../types/navbarsTypes";
import { SvgBell, SvgMenuClose, SvgMenuOpen } from "../svg/SvgTopbar";
import SearchBox from "./SearchBox";

export default function Topbar({ toggleMenu, openMenu }: IMenu) {
  return (
    <>
      <div className="">
        <SearchBox />
      </div>

      <div className="flex items-center text-stone-700">
        <SvgBell />

        <button onClick={toggleMenu} type="button" className="flex items-center text-sm ms-2 text-stone-700">
          {openMenu ? <SvgMenuOpen /> : <SvgMenuClose />}
        </button>
      </div>
    </>
  );
}
