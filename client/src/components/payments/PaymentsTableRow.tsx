import { useQuery } from "@apollo/client";
import { Payment, PaymentsTableRowProps } from "../../types/paymentTypes";
import { formatCurrency } from "../../utils/formatCurrency";
import { GET_LIABILITIES } from "../graphql/liabilities";

import { useEffect } from "react";
import { GET_PAYMENTS } from "../graphql/payments";

const PaymentsTableRow = ({
  employee,
  visibleColumns,
  insuranceCompanies,
  onClick,
  calculateTotalPrice,
}: PaymentsTableRowProps) => {
  const { data: paymentData } = useQuery(GET_PAYMENTS, {
    variables: { employeeId: employee?.id },
  });
  const totalLiabilities = calculateTotalPrice(employee, insuranceCompanies);

  const totalPayments =
    paymentData?.paymentsByEmployee.reduce((acc: number, payment: Payment) => acc + (payment.amount ?? 0), 0) || 0;

  const balance = totalPayments - totalLiabilities;

  const { data: liabilitiesByEmployee, refetch } = useQuery(GET_LIABILITIES, {
    variables: { employeeId: employee?.id },
  });

  useEffect(() => {
    refetch();
  }, [liabilitiesByEmployee, refetch]);

  console.log(employee.fullName, totalLiabilities);

  return (
    <tr
      key={employee.id}
      onClick={() => onClick(employee)}
      className="border-b odd:bg-silver hover:bg-marine/40 hover:cursor-pointer even:bg-marine/10"
    >
      <th scope="row" className="px-6 py-4 text-marine whitespace-nowrap">
        {employee.fullName}
      </th>
      {insuranceCompanies.map((company) => (
        <td
          key={company.value}
          className={`px-6 py-4 text-center font-semibold ${visibleColumns[company.value] ? "" : "hidden"} ${
            employee.healthCareMembers.filter((member) => member.category === "Employee" && member.insurance === company.value)
              .length > 0
              ? "text-red-700"
              : "text-marine"
          }`}
        >
          {employee.healthCareMembers.filter((member) => member.insurance === company.value).length}
        </td>
      ))}
      <td
        className={`px-6 py-4 text-center font-semibold ${
          employee.fitpassMembers.filter((member) => member.category === "Employee").length > 0 ? "text-red-700" : "text-marine"
        }`}
      >
        {employee.fitpassMembers.length}
      </td>
      <td className="px-6 py-4 text-xs font-semibold text-center">{formatCurrency(totalLiabilities)}</td>
      <td className="px-6 py-4 text-xs font-semibold text-center">{formatCurrency(totalPayments)}</td>
      <td className={`px-6 py-4 text-xs font-semibold text-center ${balance >= 0 ? "text-green-800" : "text-red-700"}`}>
        {formatCurrency(balance)}
      </td>
    </tr>
  );
};

export default PaymentsTableRow;
