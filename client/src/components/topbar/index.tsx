import { IMenu } from "../../types/navbarsTypes";
import { Icon } from "../common/Icon";
import { IconBell, IconMenuFold, IconMenuUnfold } from "../svg";
import SearchBox from "./SearchBox";

export default function Topbar({ toggleMenu, openMenu }: IMenu) {
  return (
    <>
      <div>
        <SearchBox />
      </div>

      <div className="flex items-center">
        <Icon icon={IconBell} color="#124e66" />

        <button onClick={toggleMenu} type="button" className="flex items-center text-sm ms-2">
          {openMenu ? (
            <Icon icon={IconMenuFold} size={32} color="#124e66" />
          ) : (
            <Icon icon={IconMenuUnfold} size={32} color="#124e66" />
          )}
        </button>
      </div>
    </>
  );
}
