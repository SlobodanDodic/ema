import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../common/Icon";
import { IconUserSecret } from "../svg";
import { GET_EMPLOYEES } from "../../graphql/employee";
import { useQuery } from "@apollo/client";
import useDebounce from "../../hooks/useDebounce";
import { Employee } from "../../types/common";

export default function SearchBox() {
  const navigate = useNavigate();
  const { data } = useQuery(GET_EMPLOYEES);
  const [queryEmployee, setQueryEmployee] = useState("");
  const debouncedQuery = useDebounce(queryEmployee, 500);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    if (debouncedQuery && data?.getAllEmployees) {
      const results = data?.getAllEmployees?.filter((employee: Employee) =>
        employee?.fullName.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setFilteredEmployees(results);
    } else {
      setFilteredEmployees([]);
    }
  }, [debouncedQuery, data]);

  const handleEmployeeDetails = (id: string) => {
    navigate(`/employees/${id}`);
    setQueryEmployee("");
  };

  return (
    <div className="search-container">
      <form id="searchBox" className="relative flex items-center max-w-sm mx-auto">
        <div className="relative w-full">
          <div className="absolute inset-y-0 flex items-center mx-3">
            <Icon icon={IconUserSecret} size={18} color="#f2f1e4" />
          </div>
          <input
            type="text"
            className="block w-full px-4 py-3 text-sm border border-none rounded bg-marine text-silver ps-10 focus:outline-none"
            placeholder="Search employee"
            value={queryEmployee}
            onChange={(e) => setQueryEmployee(e.target.value)}
          />
        </div>
      </form>
      {filteredEmployees.length > 0 && (
        <ul className="absolute left-0 top-14 w-[211px] bg-marine rounded shadow shadow-silver">
          {filteredEmployees?.map((employee: Employee) => (
            <li
              key={employee.id}
              className="p-2 m-1 text-sm shadow-sm bg-marine text-silver shadow-silver hover:cursor-pointer"
              onClick={() => handleEmployeeDetails(employee.id)}
            >
              {employee.fullName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
