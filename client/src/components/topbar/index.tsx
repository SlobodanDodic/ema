import { IMenu } from "../../types/navbarsTypes";
import { SvgBell, SvgMenuClose, SvgMenuOpen } from "../svg/SvgTopbar";
import SearchBox from "./SearchBox";

export default function Topbar({ toggleMenu, openMenu }: IMenu) {
  return (
    <>
      <div>
        <SearchBox />
      </div>

      <div className="flex items-center">
        <SvgBell />

        <button onClick={toggleMenu} type="button" className="flex items-center text-sm ms-2">
          {openMenu ? <SvgMenuOpen /> : <SvgMenuClose />}
        </button>
      </div>
    </>
  );
}
