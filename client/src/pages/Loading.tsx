export default function Loading() {
  return (
    <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center justify-center">
        <img src="/logo.png" className="h-8 m-3" alt="Logo" />
        <span className="self-center text-xl text-marine whitespace-nowrap">Loading...</span>
      </div>
    </div>
  );
}
