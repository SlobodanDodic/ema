import SvgLogo from "../svg/SvgLogo";

export default function PageHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between p-4 text-white rounded bg-marine">
      <p>{title}</p>
      <SvgLogo addClass="w-7 h-7" color="#d3d9d4" />
    </div>
  );
}
