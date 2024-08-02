import { useState, useEffect, useCallback } from "react";
import { Employee } from "../../types/common";
import { PaymentsTableProps } from "../../types/paymentTypes";
import { benefits } from "../data/categories";
import useToggle from "../../hooks/useToggle";
import PaymentsEntryModal from "./PaymentsEntryModal";
import { GET_ALL_PAYMENTS } from "../graphql/payments";
import { useQuery } from "@apollo/client";
import PaymentsTableRow from "./PaymentsTableRow";

export default function PaymentsTable({ employees, visibleColumns }: PaymentsTableProps) {
  const insuranceCompanies = benefits.insurances;
  const [isModalOpen, setIsModalOpen] = useToggle(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { data: paymentData } = useQuery(GET_ALL_PAYMENTS);

  const calculateTotalPrice = useCallback(
    (employee: Employee) => {
      let total = 0;

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
      const isFirstOfMonth = today.getDate() === 2;

      if (isFirstOfMonth) {
        console.log("The 1st of the month. Calculation performed.");
        employees.forEach((employee) => {
          console.log("Employee:", employee.fullName);

          const totalAmount = calculateTotalPrice(employee);
          console.log(`Total Amount for employee ${employee.fullName} on ${today.toDateString()}: ${totalAmount}`);
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
            <PaymentsTableRow
              key={employee.id}
              employee={employee}
              visibleColumns={visibleColumns}
              insuranceCompanies={insuranceCompanies}
              paymentData={paymentData}
              onClick={handleRowClick}
              calculateTotalPrice={calculateTotalPrice}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
