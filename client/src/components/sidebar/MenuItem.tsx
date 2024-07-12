import { Link } from "react-router-dom";

type IMenuItem = {
  icon: JSX.Element;
  path: string;
  title: string;
};

export default function MenuItem({ icon, path, title }: IMenuItem) {
  return (
    <li>
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
