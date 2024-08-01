export default function ReadModal({ setOpenRead }: { setOpenRead: () => void }) {
  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-20 -left-[1px] right-0 z-50 w-[101%] flex flex-col p-4 sm:p-6 items-center min-h-72 overflow-x-hidden overflow-y-auto bg-silver border-double border-2 border-midnight rounded"
    >
      <h1 className="text-midnight">Read</h1>

      <div className="flex flex-col items-center justify-center">
        <button onClick={() => setOpenRead()}>Leave</button>
      </div>
    </div>
  );
}
