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
          <Icon icon={IconUserSecret} size={18} color="#f2f1e4" />
        </div>

        <input
          type="text"
          className="block w-full p-2 text-sm border border-none rounded bg-marine text-oranje ps-10 focus:outline-none"
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
