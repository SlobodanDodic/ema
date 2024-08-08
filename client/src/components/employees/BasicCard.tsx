export type BasicCardProps = {
  title: string;
  text: string | number | undefined;
};

export default function BasicCard({ title, text }: BasicCardProps) {
  return (
    <div className="flex flex-col px-2 py-3 m-3 text-sm text-center rounded bg-marine text-silver">
      <p className="mb-2">
        <strong className="">{title}:</strong>
      </p>
      <p className="text-oranje">{text}</p>
    </div>
  );
}
