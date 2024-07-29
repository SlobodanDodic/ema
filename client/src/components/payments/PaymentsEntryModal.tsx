import { useState } from "react";
import { Employee } from "../../types/common";
import { SvgCash, SvgEnter, SvgSend } from "../svg/SvgPayments";
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
      <div className="flex justify-center my-6 text-center">
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

      <div className="flex flex-col justify-center pb-4 border-b sm:flex-row border-silver/20">
        <div className="grid grid-cols-1 my-2 border rounded sm:m-4 sm:grid-flow-col border-silver auto-cols-max">
          <div className="flex flex-col items-center justify-center w-full p-4 rounded-t sm:rounded-none sm:rounded-s me-3 bg-silver">
            <h2 className="text-midnight">Health Care</h2>
            <h2 className="text-midnight">Members</h2>
          </div>
          <div className="p-4">
            {employee.healthCareMembers.map((member) => (
              <p key={member.id} className="italic font-normal me-3 text-silver">
                <span className="text-oranje me-2">{member.name}</span>
                <span className="text-xs text-silver/90">{member.insurance}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 my-2 border rounded sm:m-4 sm:grid-flow-col border-silver auto-cols-max">
          <div className="flex flex-col items-center justify-center w-full p-4 rounded-t sm:rounded-none sm:rounded-s me-3 bg-silver">
            <h2 className="text-midnight">Fitpass</h2>
            <h2 className="text-midnight">Members</h2>
          </div>
          <div className="p-4">
            {employee.fitpassMembers.map((member) => (
              <p key={member.id} className="italic font-normal me-3 text-silver">
                <span className="text-oranje me-2">{member.name}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[18rem] mx-auto flex my-8">
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
            <SvgCash />
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
            <SvgEnter />
          </div>
        </div>
        <button
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-midnight bg-oranje border-2 border-midnight rounded-e hover:bg-oranje/90"
          type="button"
          onClick={handleAddAmount}
        >
          <span className="me-2">RSD</span>
          <SvgSend />
        </button>
      </div>

      <div className="flex flex-wrap justify-center">
        {amounts.map((entry, index) => (
          <div key={index} className="flex items-center justify-center w-full px-1 py-3 m-2 border rounded sm:w-[30%] lg:w-1/5">
            <div className="flex mx-3 text-xs text-oranje">{index + 1})</div>
            <div className="flex items-center text-xs font-semibold text-silver">{entry.amount} RSD</div>
            <div className="flex mx-3 text-xs text-oranje">/</div>
            <div className="flex items-center text-xs text-silver/90">{moment(entry.date).format("DD.MM.YYYY")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
