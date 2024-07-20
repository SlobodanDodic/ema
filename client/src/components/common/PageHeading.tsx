import SvgLogo from "../svg/SvgLogo";

export default function PageHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between p-4 rounded text-stone-50 bg-stone-700">
      <p>{title}</p>
      <SvgLogo addClass="w-7 h-7" color="#fafaf9" />
    </div>
  );
}
