import { useEffect, useState } from "react";
import PageHeading from "../components/common/PageHeading";
import { GET_EMPLOYEES } from "../graphql/employee";
import { useQuery } from "@apollo/client";
import { Employee } from "../types/common";
import { generateFitpassMemberConstants, getTotalFitpassMembers } from "../utils/getFitpassStats";

export default function Fipass() {
  const { data } = useQuery(GET_EMPLOYEES);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    if (data) {
      setEmployees(data?.getAllEmployees);
    }
  }, [data]);

  const totalFitpassMembers = getTotalFitpassMembers(employees);
  console.log("Total Fitpass Members:", totalFitpassMembers);

  const fitpassMemberConstants = generateFitpassMemberConstants(employees);
  console.log("Fitpass Member Constants:", fitpassMemberConstants);

  for (const [key, value] of Object.entries(fitpassMemberConstants)) {
    console.log(`${key}: ${value}`);
  }

  return <PageHeading title="Fitpass" />;
}

// I need to implement chartjs in my app.
// I want to show all the employees who have registered their Fitpass.
