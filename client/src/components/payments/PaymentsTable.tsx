import { useState } from "react";
import { Employee } from "../../types/common";
import { PaymentsTableProps } from "../../types/paymentTypes";
import PaymentsEntryModal from "./PaymentsEntryModal";
import PaymentsTableRow from "./PaymentsTableRow";
import { GET_FITPASS_BENEFITS, GET_HEALTHCARE_BENEFITS } from "../../graphql/benefits";
import { useQuery } from "@apollo/client";
import { useCalculations } from "../../hooks/useCalculations";
import { BenefitType } from "../../types/benefitTypes";
import { useToggleContext } from "../../hooks/useToggleContext";

export default function PaymentsTable({ employees, visibleColumns }: PaymentsTableProps) {
  const { paymentModal, setPaymentModal } = useToggleContext();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const { data: healthcareBenefit } = useQuery(GET_HEALTHCARE_BENEFITS);
  const { data: fitpassBenefit } = useQuery(GET_FITPASS_BENEFITS);

  const { calculateTotalPrice } = useCalculations(healthcareBenefit?.getAllHealthcareData, fitpassBenefit?.getAllFitpassData);

  const handleRowClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setPaymentModal();
  };

  return (
    <>
      {paymentModal && <div className="absolute top-0 left-0 z-40 w-full h-full bg-black/20" />}

      {paymentModal && selectedEmployee && (
        <PaymentsEntryModal employee={selectedEmployee} toggleModal={() => setPaymentModal()} />
      )}

      <table className="w-full text-sm text-left text-gray-700 rtl:text-right">
        <thead className="text-sm text-white bg-marine">
          <tr>
            <th scope="col" className="px-6 py-4">
              Full Name
            </th>
            {healthcareBenefit?.getAllHealthcareData?.map((company: BenefitType) => (
              <th
                key={company.value}
                scope="col"
                className={`px-6 py-4 text-center ${visibleColumns?.[company?.value] ? "" : "hidden"}`}
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
              insuranceCompanies={healthcareBenefit?.getAllHealthcareData}
              onClick={handleRowClick}
              calculateTotalPrice={calculateTotalPrice}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
