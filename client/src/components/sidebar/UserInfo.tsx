import { useAuth } from "../../utils/useAuth";

export default function UserInfo() {
  const user = useAuth();

  if (!user) {
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
      <p className="py-2">Firstname Surname {user.id}</p>
      <hr />
      <p className="py-2">Logout</p>
    </div>
  );
}
