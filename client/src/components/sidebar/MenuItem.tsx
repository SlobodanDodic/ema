import { Link, useNavigate } from "react-router-dom";
import { useToggleContext } from "../../hooks/useToggleContext";

type IMenuItem = {
  icon: JSX.Element;
  path: string;
  title: string;
};

export default function MenuItem({ icon, path, title }: IMenuItem) {
  const { setOpenMenu } = useToggleContext();

  const navigate = useNavigate();

  const handleClick = () => {
    setOpenMenu();
    navigate(path);
  };

  return (
    <li className="px-4">
      <Link
        to={path}
        onClick={handleClick}
        className="flex items-center p-2 font-medium tracking-tight rounded-lg text-silver hover:no-underline hover:bg-marine group"
      >
        {icon}
        <span className="ms-3">{title}</span>
      </Link>
    </li>
  );
}
