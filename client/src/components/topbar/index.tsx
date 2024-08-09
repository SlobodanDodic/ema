import useToggle from "../../hooks/useToggle";
import { useToggleContext } from "../../hooks/useToggleContext";
import { Icon } from "../common/Icon";
import { IconBell, IconMenuFold, IconMenuUnfold, IconBxsBookReader } from "../svg";
import ReadModal from "./ReadModal";
import SearchBox from "./SearchBox";

export default function Topbar() {
  const [openRead, setOpenRead] = useToggle(false);
  const { openMenu, setOpenMenu } = useToggleContext();

  return (
    <>
      <div>
        <SearchBox />
      </div>

      <div className="flex items-center">
        <button onClick={() => setOpenRead()} type="button" className="flex items-center">
          <Icon icon={IconBxsBookReader} color="#124e66" className="ms-4" size={30} />
        </button>

        {openRead && <ReadModal setOpenRead={setOpenRead} />}

        <Icon icon={IconBell} color="#124e66" className="mx-2" size={30} />

        <button onClick={setOpenMenu} type="button" className="flex items-center">
          {openMenu ? (
            <Icon icon={IconMenuFold} size={33} color="#124e66" />
          ) : (
            <Icon icon={IconMenuUnfold} size={33} color="#124e66" />
          )}
        </button>
      </div>
    </>
  );
}
