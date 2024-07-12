import { SvgPeople, SvgSearch } from "../svg/SvgTopbar";

export default function SearchBox() {
  return (
    <form className="flex items-center max-w-sm mx-auto">
      <div className="relative w-full">
        <div className="absolute inset-y-0 flex items-center ps-2">
          <SvgPeople />
        </div>

        <input
          type="text"
          className="block w-full p-2 text-sm bg-white border rounded border-stone-300 text-stone-700 ps-10 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
          placeholder="Search employee"
        />
      </div>

      <button type="submit" className="p-2 transition rounded text-stone-700 hover:text-amber-600">
        <SvgSearch />
      </button>
    </form>
  );
}
