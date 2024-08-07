import { useAuth } from "../../hooks/useAuth";
import { useToggleContext } from "../../hooks/useToggleContext";
import { Icon } from "../common/Icon";
import { IconLogoutCircleRLine } from "../svg";

export default function UserInfo() {
  const authContext = useAuth();
  const { toggleLogoutModal, setOpenMenu } = useToggleContext();

  if (!authContext?.user) {
    return (
      <div className="px-6 pb-4 text-stone-50">
        <p className="py-2">Loading Username...</p>
        <hr />
        <p className="py-2">Logout</p>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 pb-4 text-stone-50">
        <div className="flex flex-col p-2">
          <p className="pt-2 capitalize">{authContext?.user.username}</p>
          <p className="pb-2 text-amber-500">{authContext?.user.email}</p>
        </div>
        <hr />
        <button
          className="flex items-center w-full p-2 mt-2 font-medium tracking-tight rounded-lg text-stone-50 hover:no-underline hover:bg-stone-600"
          onClick={() => {
            toggleLogoutModal();
            setOpenMenu();
          }}
        >
          <Icon icon={IconLogoutCircleRLine} />
          <span className="ms-3">Logout</span>
        </button>
      </div>
    </>
  );
}
