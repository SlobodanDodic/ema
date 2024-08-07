import { useEffect, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Payment, PaymentsTableRowProps } from "../../types/paymentTypes";
import { formatCurrency } from "../../utils/formatCurrency";
import { CREATE_LIABILITY, GET_LIABILITIES, GET_TOTAL_LIABILITIES_BY_EMPLOYEE } from "../../graphql/liabilities";
import { GET_PAYMENTS } from "../../graphql/payments";

const PaymentsTableRow = ({
  employee,
  visibleColumns,
  insuranceCompanies,
  onClick,
  calculateTotalPrice,
}: PaymentsTableRowProps) => {
  const { data: paymentData, loading: loadingPayments } = useQuery(GET_PAYMENTS, {
    variables: { employeeId: employee?.id },
  });
  const totalLiabilitiesByEmployee = calculateTotalPrice(employee, insuranceCompanies);

  const totalPayments =
    paymentData?.paymentsByEmployee.reduce((acc: number, payment: Payment) => acc + (payment.amount ?? 0), 0) || 0;

  const { data: liabilitiesByEmployee, refetch } = useQuery(GET_LIABILITIES, {
    variables: { employeeId: employee?.id },
  });

  const { data: totalLiabilitiesByEmployeeDb, loading: loadingLiabilities } = useQuery(GET_TOTAL_LIABILITIES_BY_EMPLOYEE, {
    variables: { employeeId: employee?.id },
  });

  const [createLiability] = useMutation(CREATE_LIABILITY);

  const balance = totalPayments - totalLiabilitiesByEmployeeDb?.getTotalLiabilitiesByEmployee;

  const hasRunOnce = useRef(false);

  useEffect(() => {
    if (
      employee &&
      totalLiabilitiesByEmployee !== undefined &&
      liabilitiesByEmployee?.liabilitiesByEmployee &&
      !hasRunOnce.current
    ) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const todayIsFirst = currentDate.getDate() === 1;

      const lastRecordedString = liabilitiesByEmployee?.liabilitiesByEmployee?.[0]?.recordedDate;
      const lastRecorded = lastRecordedString ? new Date(lastRecordedString) : null;
      const lastRecordedMonth = lastRecorded?.getMonth();
      const lastRecordedYear = lastRecorded?.getFullYear();

      const shouldExecute =
        todayIsFirst && (!lastRecorded || lastRecordedMonth !== currentMonth || lastRecordedYear !== currentYear);

      if (shouldExecute || liabilitiesByEmployee?.liabilitiesByEmployee?.length === 0) {
        createLiability({
          variables: {
            input: {
              employeeId: employee.id,
              amount: totalLiabilitiesByEmployee as number,
              recordedDate: currentDate.toISOString(),
            },
          },
        }).then(() => {
          refetch();
          hasRunOnce.current = true;
        });
      }
    }
  }, [employee, totalLiabilitiesByEmployee, liabilitiesByEmployee, refetch, createLiability]);

  return (
    <tr
      key={employee.id}
      onClick={() => onClick(employee)}
      className="border-b odd:bg-silver hover:bg-marine/40 hover:cursor-pointer even:bg-marine/10"
    >
      <th scope="row" className="px-6 py-4 text-marine whitespace-nowrap">
        {employee.fullName}
      </th>
      {insuranceCompanies?.map((company) => (
        <td
          key={company.value}
          className={`px-6 py-4 text-center font-semibold ${visibleColumns?.[company.value] ? "" : "hidden"} ${
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
      <td className="px-6 py-4 text-xs font-semibold text-center">
        {loadingLiabilities ? "Loading..." : formatCurrency(totalLiabilitiesByEmployeeDb?.getTotalLiabilitiesByEmployee)}
      </td>
      <td className="px-6 py-4 text-xs font-semibold text-center">
        {loadingPayments ? "Loading..." : formatCurrency(totalPayments)}
      </td>
      <td className={`px-6 py-4 text-xs font-semibold text-center ${balance >= 0 ? "text-green-800" : "text-red-700"}`}>
        {loadingLiabilities || loadingPayments ? "Loading..." : formatCurrency(balance)}
      </td>
    </tr>
  );
};

export default PaymentsTableRow;
