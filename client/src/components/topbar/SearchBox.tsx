import React, { useState, useEffect } from "react";
import { Icon } from "../common/Icon";
import { IconUserSecret } from "../svg";
import { GET_EMPLOYEES } from "../../graphql/employee";
import { useQuery } from "@apollo/client";
import useDebounce from "../../hooks/useDebounce";

export default function SearchBox() {
  const { data } = useQuery(GET_EMPLOYEES);
  const [queryEmployee, setQueryEmployee] = useState("");
  const debouncedQuery = useDebounce(queryEmployee, 500); // 500ms debounce delay

  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    if (debouncedQuery && data?.getAllEmployees) {
      const results = data?.getAllEmployees?.filter((employee: { fullName: string }) =>
        employee?.fullName.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setFilteredEmployees(results);
    } else {
      setFilteredEmployees([]);
    }
  }, [debouncedQuery, data]);

  const handleSearchEmployee = () => {
    console.log("search", queryEmployee);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchEmployee();
    }
  };

  return (
    <div className="search-container">
      <form id="searchBox" className="relative flex items-center max-w-sm mx-auto">
        <div className="relative w-full">
          <div className="absolute inset-y-0 flex items-center ps-2">
            <Icon icon={IconUserSecret} size={18} color="#f2f1e4" />
          </div>
          <input
            type="text"
            className="block w-full p-2 text-sm border border-none rounded bg-marine text-silver ps-10 focus:outline-none"
            placeholder="Search employee"
            value={queryEmployee}
            onChange={(e) => setQueryEmployee(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </form>
      {filteredEmployees.length > 0 && (
        <ul className="absolute left-0 top-14 w-[211px] bg-marine rounded shadow shadow-silver">
          {filteredEmployees?.map((employee: { id: string; fullName: string }) => (
            <li key={employee.id} className="p-2 m-1 text-sm shadow-sm bg-marine text-silver shadow-silver">
              {employee.fullName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
