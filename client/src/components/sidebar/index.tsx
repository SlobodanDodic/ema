import { Icon } from "../common/Icon";
import {
  IconNotesMedical,
  IconPencilBoxMultiple,
  IconUsersLine,
  IconPieChart,
  IconBxCalendarStar,
  IconWeightLifter,
  IconEcommerce,
} from "../svg";
import MenuItem from "./MenuItem";
import UserInfo from "./UserInfo";

export default function Menu({ openMenu }: { openMenu: boolean }) {
  const iconClassName = "transition duration-75 w-7 h-7 text-silver group-hover:text-oranje";
  return (
    <aside className={openMenu ? `aside translate-x-0` : `aside -translate-x-72`}>
      <ul className="space-y-2">
        <div className="flex items-center pb-4 ps-1">
          <img src="/logo.png" className="mx-2 h-7" alt="Logo" />
          <span className="self-center text-[1.45rem] text-stone-50 whitespace-nowrap">Employee App</span>
        </div>

        <MenuItem icon={<Icon icon={IconPieChart} className={iconClassName} />} path="/" title="Dashboard" />
        <MenuItem icon={<Icon icon={IconUsersLine} className={iconClassName} />} path="/employees" title="Employees" />
        <MenuItem icon={<Icon icon={IconNotesMedical} className={iconClassName} />} path="/health_care" title="Health Care" />
        <MenuItem icon={<Icon icon={IconWeightLifter} className={iconClassName} />} path="/fitpass" title="Fitpass" />
        <MenuItem icon={<Icon icon={IconBxCalendarStar} className={iconClassName} />} path="/events" title="Events" />
        <MenuItem icon={<Icon icon={IconEcommerce} className={iconClassName} />} path="/payments" title="Payments" />

        <hr className="w-4/5 ms-[10%]" />
        <MenuItem icon={<Icon icon={IconPencilBoxMultiple} className={iconClassName} />} path="/form" title="Entry Form" />
      </ul>

      <UserInfo />
    </aside>
  );
}
