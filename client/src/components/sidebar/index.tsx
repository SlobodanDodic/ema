import { SvgDashboard, SvgEmployees, SvgEvents, SvgFitpass, SvgForm, SvgHealth, SvgPayment } from "../svg/SvgSidebar";
import MenuItem from "./MenuItem";
import UserInfo from "./UserInfo";

export default function Menu({ openMenu }: { openMenu: boolean }) {
  return (
    <aside className={openMenu ? `aside translate-x-0` : `aside -translate-x-72`}>
      <ul className="space-y-2">
        <div className="flex items-center pb-4 ps-1">
          <img src="/logo.png" className="mx-2 h-7" alt="Logo" />
          <span className="self-center text-2xl text-stone-50 whitespace-nowrap">Employee App</span>
        </div>

        <MenuItem icon={<SvgDashboard />} path="/" title="Dashboard" />
        <MenuItem icon={<SvgEmployees />} path="/employees" title="Employees" />
        <MenuItem icon={<SvgHealth />} path="/health_care" title="Health Care" />
        <MenuItem icon={<SvgFitpass />} path="/fitpass" title="Fitpass" />
        <MenuItem icon={<SvgEvents />} path="/events" title="Events" />
        <MenuItem icon={<SvgPayment />} path="/payments" title="Payments" />

        <hr className="w-4/5 ms-[10%]" />
        <MenuItem icon={<SvgForm />} path="/form" title="Form" />
      </ul>

      <UserInfo />
    </aside>
  );
}
