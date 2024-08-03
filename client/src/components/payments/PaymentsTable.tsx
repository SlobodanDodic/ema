import { useState, useEffect } from "react";
import { Employee } from "../../types/common";
import { PaymentsTableProps } from "../../types/paymentTypes";
import { benefits } from "../data/categories";
import useToggle from "../../hooks/useToggle";
import PaymentsEntryModal from "./PaymentsEntryModal";
import PaymentsTableRow from "./PaymentsTableRow";
import { useBenefitCalculations } from "../../hooks/useBenefitCalculations";

export default function PaymentsTable({ employees, visibleColumns }: PaymentsTableProps) {
  const [isModalOpen, setIsModalOpen] = useToggle(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const { calculateTotalPrice, calculateMonthlyObligation } = useBenefitCalculations(benefits);

  const handleRowClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen();
  };

  useEffect(() => {
    calculateMonthlyObligation(employees);
  }, [employees, calculateMonthlyObligation]);

  return (
    <>
      {isModalOpen && selectedEmployee && (
        <div
          id="defaultModal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed -top-[1px] -left-[2px] right-0 z-30 w-[101%] overflow-x-hidden overflow-y-auto bg-midnight border-midnight max-w-5xl h-auto mx-auto rounded"
        >
          <PaymentsEntryModal employee={selectedEmployee} toggleModal={() => setIsModalOpen()} />
        </div>
      )}

      <table className="w-full text-sm text-left text-gray-700 rtl:text-right">
        <thead className="text-sm text-white bg-marine">
          <tr>
            <th scope="col" className="px-6 py-4">
              Full Name
            </th>
            {benefits.insurances.map((company) => (
              <th
                key={company.value}
                scope="col"
                className={`px-6 py-4 text-center ${visibleColumns[company.value] ? "" : "hidden"}`}
              >
                {company.value}
              </th>
            ))}
            <th scope="col" className="px-6 py-4 text-center">
              Fitpass
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Total Liabilities
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Total Payments
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee: Employee) => (
            <PaymentsTableRow
              key={employee.id}
              employee={employee}
              visibleColumns={visibleColumns}
              insuranceCompanies={benefits?.insurances}
              onClick={handleRowClick}
              calculateTotalPrice={calculateTotalPrice}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
