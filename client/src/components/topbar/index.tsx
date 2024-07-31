import useToggle from "../../hooks/useToggle";
import { IMenu } from "../../types/navbarsTypes";
import { Icon } from "../common/Icon";
import { IconBell, IconMenuFold, IconMenuUnfold, IconSettings } from "../svg";
import SearchBox from "./SearchBox";
import SettingsModal from "./SettingsModal";

export default function Topbar({ toggleMenu, openMenu }: IMenu) {
  const [openSettings, setOpenSettings] = useToggle(false);

  return (
    <>
      <div>
        <SearchBox />
      </div>

      <div className="flex items-center">
        <Icon icon={IconBell} color="#124e66" className="ms-4" />

        <button onClick={() => setOpenSettings()} type="button" className="flex items-center">
          <Icon icon={IconSettings} color="#124e66" className="mx-2" />
        </button>

        {openSettings && <SettingsModal setOpenSettings={setOpenSettings} />}

        <button onClick={toggleMenu} type="button" className="flex items-center">
          {openMenu ? (
            <Icon icon={IconMenuFold} size={30} color="#124e66" />
          ) : (
            <Icon icon={IconMenuUnfold} size={30} color="#124e66" />
          )}
        </button>
      </div>
    </>
  );
}
