import { useState, useEffect } from "react";
import { Employee } from "../../types/formTypes";
import { benefits } from "../data/categories";
import useToggle from "../../hooks/useToggle";
import PaymentsTable from "./PaymentsTable";

export default function PaymentsDetails({ employees, handleRowClick }: { employees: Employee[]; handleRowClick: () => void }) {
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useToggle(false);
  const insuranceCompanies = benefits.insurances;

  useEffect(() => {
    const initialVisibleColumns = insuranceCompanies.reduce(
      (acc, company) => {
        const hasData = employees.some((employee) =>
          employee.healthCareMembers.some((member) => member.insurance === company.value)
        );
        acc[company.value] = hasData;
        return acc;
      },
      {} as Record<string, boolean>
    );
    setVisibleColumns(initialVisibleColumns);
  }, [employees, insuranceCompanies]);

  const toggleColumnVisibility = (companyValue: string) => {
    setVisibleColumns((prevState) => ({
      ...prevState,
      [companyValue]: !prevState[companyValue],
    }));
  };

  return (
    <div className="relative mt-6 overflow-x-auto">
      <div className="mb-4">
        <button
          id="dropdownCheckboxButton"
          className="relative inline-flex items-center w-40 px-5 py-2 mb-2 text-sm font-medium text-center text-white rounded bg-marine hover:bg-marine/80"
          type="button"
          onClick={() => setIsModalOpen()}
        >
          Show columns
          <svg viewBox="0 0 512 512" fill="white" height="1em" width="1em" className="ms-3">
            <path d="M472 168H40a24 24 0 010-48h432a24 24 0 010 48zM392 280H120a24 24 0 010-48h272a24 24 0 010 48zM296 392h-80a24 24 0 010-48h80a24 24 0 010 48z" />
          </svg>
        </button>

        {isModalOpen && (
          <div className="absolute left-0 z-10 flex flex-col w-40 border-2 rounded top-10 bg-silver border-marine">
            {insuranceCompanies.map((company) => (
              <label key={company.value} className="inline-flex items-center w-40 cursor-pointer ms-2">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={Boolean(visibleColumns[company.value])}
                  onChange={() => toggleColumnVisibility(company.value)}
                />
                <div className="relative w-11 h-6 bg-marine/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-marine/80"></div>
                <span className="m-2 text-sm font-medium text-marine">{company.value}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <PaymentsTable employees={employees} visibleColumns={visibleColumns} handleRowClick={handleRowClick} />
    </div>
  );
}
