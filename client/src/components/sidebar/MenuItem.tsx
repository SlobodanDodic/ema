import { Link } from "react-router-dom";
import { IMenuItem } from "../../types/navbarsTypes";

export default function MenuItem({ icon, path, title }: IMenuItem) {
  return (
    <li className="px-4">
      <Link
        to={`${path}`}
        className="flex items-center p-2 font-medium tracking-tight rounded-lg text-stone-50 hover:no-underline hover:bg-stone-600 group"
      >
        {icon}
        <span className="ms-3">{title}</span>
      </Link>
    </li>
  );
}
