import { useState, useEffect, useCallback } from "react";
import { Employee } from "../../types/common";
import { PaymentsTableProps } from "../../types/paymentTypes";
import { benefits } from "../data/categories";
import useToggle from "../../hooks/useToggle";
import PaymentsEntryModal from "./PaymentsEntryModal";

export default function PaymentsTable({ employees, visibleColumns }: PaymentsTableProps) {
  const insuranceCompanies = benefits.insurances;
  const [isModalOpen, setIsModalOpen] = useToggle(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const calculateTotalPrice = useCallback(
    (employee: Employee) => {
      let total = 0;

      // Calculate insurance prices
      insuranceCompanies.forEach((company) => {
        const memberCount = employee.healthCareMembers.filter((member) => member.insurance === company.value).length;

        if (memberCount > 0) {
          const discount = employee.healthCareMembers.some(
            (member) => member.category === "Employee" && member.insurance === company.value
          )
            ? company.employeeDiscount
            : 0;

          total += company.price * memberCount - discount;
        }
      });

      // Calculate Fitpass price
      const fitpassCount = employee.fitpassMembers.length;
      const fitpassDiscount = employee.fitpassMembers.some((member) => member.category === "Employee")
        ? benefits.fitpass[0].employeeDiscount
        : 0;
      total += (benefits.fitpass[0].price - fitpassDiscount) * fitpassCount;

      return total;
    },
    [insuranceCompanies]
  );

  useEffect(() => {
    const calculateMonthlyObligation = () => {
      const today = new Date();
      const isFirstOfMonth = today.getDate() === 1;

      if (isFirstOfMonth) {
        employees.forEach((employee) => {
          const totalAmount = calculateTotalPrice(employee);
          console.log(`Total Amount for ${employee.fullName} on ${today.toDateString()}: ${totalAmount}`);
        });
      } else {
        console.log("Not the 1st of the month. Calculation not performed.");
      }
    };

    calculateMonthlyObligation();
  }, [employees, calculateTotalPrice]);

  const handleRowClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen();
  };

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
            {insuranceCompanies.map((company) => (
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
            <tr
              key={employee.id}
              onClick={() => handleRowClick(employee)}
              className="border-b odd:bg-silver hover:bg-marine/40 hover:cursor-pointer even:bg-marine/10"
            >
              <th scope="row" className="px-6 py-4 text-marine whitespace-nowrap">
                {employee.fullName}
              </th>
              {insuranceCompanies.map((company) => (
                <td
                  key={company.value}
                  className={`px-6 py-4 text-center font-semibold ${visibleColumns[company.value] ? "" : "hidden"} ${employee.healthCareMembers.filter((member) => member.category === "Employee" && member.insurance === company.value).length > 0 ? "text-red-700" : "text-marine"}`}
                >
                  {employee.healthCareMembers.filter((member) => member.insurance === company.value).length}
                </td>
              ))}
              <td
                className={`px-6 py-4 text-center font-semibold ${employee.fitpassMembers.filter((member) => member.category === "Employee").length > 0 ? "text-red-700" : "text-marine"}`}
              >
                {employee.fitpassMembers.length}
              </td>
              <td className="px-6 py-4 text-xs font-semibold text-center">{calculateTotalPrice(employee)} RSD</td>
              <td className="px-6 py-4 text-xs font-semibold text-center">0 RSD</td>
              <td className="px-6 py-4 text-xs font-semibold text-center">0 RSD</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
