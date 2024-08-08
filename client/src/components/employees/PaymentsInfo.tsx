import { useQuery } from "@apollo/client";
import { GET_EMPLOYEE_PAYMENTS } from "../../graphql/payments";
import { Employee } from "../../types/common";
import Loading from "../../pages/Loading";
import { Payment } from "../../types/paymentTypes";
import { formatCurrency } from "../../utils/formatCurrency";

export default function PaymentsInfo({
  employeeData,
  formatDate,
}: {
  employeeData: Employee;
  formatDate: (date: string | Date | null | undefined) => string;
}) {
  const { data: paymentData, loading: loadingPayments } = useQuery(GET_EMPLOYEE_PAYMENTS, {
    variables: { employeeId: employeeData?.id },
  });

  if (loadingPayments) return <Loading />;

  return (
    <div className="flex flex-col items-center my-3">
      <h3 className="mb-4 text-xl font-semibold text-shadow text-oranje">All Payments:</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {paymentData?.paymentsByEmployee?.map((payment: Payment, i: number) => (
          <div
            key={payment?.id}
            className="flex px-3 py-2 m-2 text-sm font-medium rounded shadow-inner shadow-marine text-marine"
          >
            <p>
              <span className="text-oranje text-shadow me-2">{i + 1}.)</span> {formatDate(payment?.entryDate)}{" "}
              <span className="mx-1 text-oranje text-shadow">/</span> {formatCurrency(payment?.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
