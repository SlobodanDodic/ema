import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeading from "../components/common/PageHeading";
import { GET_EMPLOYEES } from "../components/graphql/employee";
import { Employee } from "../types/formTypes";

export default function Payments() {
  const { data } = useQuery(GET_EMPLOYEES);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setEmployees(data?.findAllEmployees);
    }
  }, [data]);

  const handleRowClick = (employee: Employee) => {
    navigate("/form", { state: { employee } });
  };

  return (
    <div>
      <PageHeading title="Payments" />

      <div className="relative mt-6 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 rtl:text-right">
          <thead className="text-sm text-white bg-marine">
            <tr>
              <th scope="col" className="px-6 py-4">
                Full Name
              </th>
              <th scope="col" className="px-6 py-4">
                Health Members
              </th>
              <th scope="col" className="px-6 py-4">
                Fitpass Members
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
                <td className="px-6 py-4 text-marine">{employee.healthCareMembers.length}</td>
                <td className="px-6 py-4 text-marine">{employee.fitpassMembers.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
