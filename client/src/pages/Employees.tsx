import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeading from "../components/common/PageHeading";
import { GET_EMPLOYEES, DELETE_EMPLOYEE } from "../graphql/employee";
import { Employee } from "../types/common";
import useToggle from "../hooks/useToggle";

export default function Employees() {
  const { data } = useQuery(GET_EMPLOYEES);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useToggle(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (data) {
      setEmployees(data?.getAllEmployees);
    }
  }, [data]);

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>, employee: Employee) => {
    if (e.altKey) {
      setSelectedEmployee(employee);
      setIsModalOpen();
    } else {
      navigate("/form", { state: { employee } });
    }
  };

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });

  const handleDelete = () => {
    if (selectedEmployee) {
      deleteEmployee({ variables: { id: selectedEmployee.id } })
        .then(() => {
          console.log(`Employee ${selectedEmployee.fullName} deleted successfully!`);
          setIsModalOpen();
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
        });
    }
  };

  return (
    <div>
      <PageHeading title="Employees" />

      {isModalOpen && selectedEmployee && (
        <div className="absolute z-40 flex flex-col items-center justify-center w-full max-w-sm px-10 py-6 -translate-x-1/2 border-2 rounded shadow-md -translate-y-1/3 border-oranje left-1/2 top-1/2 bg-marine shadow-midnight">
          <h2 className="mb-4 text-center text-silver">Are you sure you want to delete an employee:</h2>
          <h1 className="px-3 py-2 my-4 text-center rounded bg-oranje text-midnight">{selectedEmployee.fullName}?</h1>
          <div className="flex mb-3 mt-7">
            <button
              className="w-full px-4 py-1 font-medium tracking-wide text-center rounded me-4 text-midnight bg-silver hover:text-silver hover:bg-red-800"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="w-full px-4 py-1 font-medium tracking-wide text-center rounded text-midnight bg-silver hover:text-silver hover:bg-midnight"
              onClick={() => setIsModalOpen()}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="relative mt-6 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 rtl:text-right">
          <thead className="text-sm text-white bg-marine">
            <tr>
              <th scope="col" className="px-6 py-4">
                Full Name
              </th>
              <th scope="col" className="px-6 py-4">
                Job Title
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
                onClick={(e) => handleRowClick(e, employee)}
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
