import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import PageHeading from "../components/common/PageHeading";
import { GET_EMPLOYEES } from "../components/graphql/employee";
import PaymentsDetails from "../components/payments/PaymentsDetails";
import { Employee } from "../types/common";

export default function Payments() {
  const { data } = useQuery(GET_EMPLOYEES);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    if (data) {
      setEmployees(data?.getAllEmployees);
    }
  }, [data]);

  return (
    <>
      <PageHeading title="Payments" />

      <PaymentsDetails employees={employees} />
    </>
  );
}
