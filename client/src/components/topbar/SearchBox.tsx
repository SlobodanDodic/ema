import { Icon } from "../common/Icon";
import { IconUserSecret } from "../svg";

export default function SearchBox() {
  const handleSearchEmployee = () => {
    console.log("Searching...");
  };

  return (
    <form id="searchBox" className="flex items-center max-w-sm mx-auto">
      <div className="relative w-full">
        <div className="absolute inset-y-0 flex items-center ps-2">
          <Icon icon={IconUserSecret} size={18} color="#124e66" />
        </div>

        <input
          type="text"
          className="block w-full p-2 text-sm bg-white border rounded border-sky-700 text-sky-700 ps-10 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-700"
          placeholder="Search employee"
          onKeyDown={(e) => {
            e.preventDefault();
            if (e.key === "Enter") handleSearchEmployee();
          }}
        />
      </div>
    </form>
  );
}
