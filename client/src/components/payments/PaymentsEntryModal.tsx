import { useState } from "react";
import { Employee } from "../../types/common";
import { Icon } from "../common/Icon";
import { IconEcommerce, IconEnter, IconNotesMedical, IconSend, IconWeightLifter } from "../svg";
import moment from "moment";

export default function PaymentsEntryModal({ employee, toggleModal }: { employee: Employee; toggleModal: () => void }) {
  const [amounts, setAmounts] = useState<{ amount: number; date: string }[]>([]);
  const [currentAmount, setCurrentAmount] = useState<number | "">("");

  const handleAddAmount = () => {
    if (currentAmount === "") return;
    const date = new Date().toISOString(); // Use ISO 8601 format
    setAmounts((prev) => [...prev, { amount: currentAmount as number, date }]);
    setCurrentAmount("");
  };

  return (
    <div className="relative flex flex-col px-8 pt-4 pb-20">
      <div className="flex justify-center my-4 text-center">
        <h1 className="font-semibold uppercase text-oranje">{employee.fullName}</h1>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={toggleModal}
          className="absolute px-6 py-1 font-medium tracking-wider -translate-x-1/2 bg-transparent rounded shadow shadow-oranje/50 bottom-6 left-1/2 text-oranje hover:bg-oranje hover:text-midnight"
        >
          Exit
        </button>
      </div>

      <div className="grid items-center justify-center w-full grid-flow-row pb-6 border-b rounded lg:grid-flow-col auto-cols-max border-silver/20">
        <div className="flex items-center m-1">
          <Icon color="#f2f1e4" size={44} icon={IconNotesMedical} />
          <div className="p-4">
            {employee.healthCareMembers.map((member) => (
              <p key={member.id} className="italic font-normal me-3 text-silver">
                <span className="text-oranje me-2">{member.name}</span>
                <span className="text-xs text-silver/90">{member.insurance}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="flex items-center m-1">
          <Icon color="#f2f1e4" size={44} icon={IconWeightLifter} />
          <div className="p-4">
            {employee.fitpassMembers.map((member) => (
              <p key={member.id} className="italic font-normal me-3 text-silver">
                <span className="text-oranje me-2">{member.name}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[18rem] mx-auto flex my-6">
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
            <Icon color="#212a31" size={20} icon={IconEcommerce} />
          </div>
          <input
            type="number"
            value={currentAmount}
            onChange={(e) => setCurrentAmount(Number(e.target.value) || "")}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddAmount();
            }}
            className="block p-2.5 w-full z-20 ps-10 text-sm font-medium text-midnight bg-oranje border-2 border-midnight rounded-s hover:bg-oranje/90 focus:outline-none"
            placeholder="Enter the amount"
          />
          <div className="absolute inset-y-0 end-3 top-0 flex items-center ps-3.5 pointer-events-none">
            <Icon color="#212a31" size={20} icon={IconEnter} />
          </div>
        </div>
        <button
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-midnight bg-oranje border-2 border-midnight rounded-e hover:bg-oranje/90"
          type="button"
          onClick={handleAddAmount}
        >
          <span className="me-2">RSD</span>
          <Icon color="#212a31" size={16} icon={IconSend} />
        </button>
      </div>

      <div className="flex flex-wrap justify-center">
        {amounts.map((entry, index) => (
          <div key={index} className="grid justify-center w-full grid-flow-col p-3 m-2 border rounded auto-cols-max sm:w-auto">
            <div className="text-xs text-silver/90">{moment(entry.date).format("DD.MM.YYYY")}</div>
            <div className="mx-3 text-xs text-oranje">/</div>
            <div className="text-xs font-semibold text-silver">{entry.amount} RSD</div>
          </div>
        ))}
      </div>
    </div>
  );
}
