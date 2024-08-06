import { useQuery } from "@apollo/client";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeading from "../components/common/PageHeading";
import { GET_EMPLOYEES } from "../components/graphql/employee";
import { Employee } from "../types/common";

export default function Employees() {
  const { data } = useQuery(GET_EMPLOYEES);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setEmployees(data?.getAllEmployees);
    }
  }, [data]);

  const handleRowClick = (employee: Employee) => {
    navigate("/form", { state: { employee } });
  };

  return (
    <div>
      <PageHeading title="Employees" />

      <div className="relative mt-6 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 rtl:text-right">
          <thead className="text-sm text-white bg-marine">
            <tr>
              <th scope="col" className="px-6 py-4">
                Full Name
              </th>
              <th scope="col" className="px-6 py-4">
                Job title
              </th>
              <th scope="col" className="px-6 py-4">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-4">
                Birthday
              </th>
              <th scope="col" className="px-6 py-4">
                First Contract
              </th>
              <th scope="col" className="px-6 py-4">
                Health Members
              </th>
              <th scope="col" className="px-6 py-4">
                Fitpass Members
              </th>
              <th scope="col" className="px-6 py-4">
                Vision Check
              </th>
              <th scope="col" className="px-6 py-4">
                Work Safety
              </th>
              <th scope="col" className="px-6 py-4">
                Fire Safety
              </th>
              <th scope="col" className="px-6 py-4">
                Medical Training
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
                <td className="px-6 py-4 text-marine">{employee.jobTitle}</td>
                <td className="px-6 py-4 text-marine">{employee.phoneNumber}</td>
                <td className="px-6 py-4 text-marine">{moment(employee.birthday).format("DD MMM YYYY")}</td>
                <td className="px-6 py-4 text-marine">{moment(employee.contract).format("DD MMM YYYY")}</td>
                <td className="px-6 py-4 text-marine">{employee.healthCareMembers.length}</td>
                <td className="px-6 py-4 text-marine">{employee.fitpassMembers.length}</td>
                <td className="px-6 py-4 text-marine">{moment(employee.eyes).format("DD MMM YYYY")}</td>
                <td className="px-6 py-4 text-marine">{moment(employee.safety).format("DD MMM YYYY")}</td>
                <td className="px-6 py-4 text-marine">{moment(employee.fire).format("DD MMM YYYY")}</td>
                <td className="px-6 py-4 text-marine">{moment(employee.firstAid).format("DD MMM YYYY")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
