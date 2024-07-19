import { useAuth } from "../../hooks/useAuth";

export default function UserInfo() {
  const authContext = useAuth();

  const handleLogout = () => {
    authContext?.setLoggedUser(null);
    authContext?.setToken(null);
  };

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
    <div className="px-6 pb-4 text-stone-50">
      <p className="pt-2 capitalize">{authContext?.user.username}</p>
      <p className="pb-2">{authContext?.user.email}</p>
      <hr />
      <button className="py-2" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
