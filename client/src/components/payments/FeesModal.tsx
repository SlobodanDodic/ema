export default function FeesModal({ toggleModal }: { toggleModal: () => void }) {
  return (
    <div>
      <button
        type="button"
        onClick={toggleModal}
        className="inline-flex items-center px-2 py-1 ml-auto bg-transparent rounded text-silver hover:bg-silver/20 hover:text-silver"
      >
        Leave
      </button>
    </div>
  );
}
