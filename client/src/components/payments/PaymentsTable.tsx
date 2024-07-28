import { Employee } from "../../types/formTypes";
import { benefits } from "../data/categories";

export default function PaymentsTable({
  employees,
  visibleColumns,
  handleRowClick,
}: {
  employees: Employee[];
  visibleColumns: Record<string, boolean>;
  handleRowClick: () => void;
}) {
  const insuranceCompanies = benefits.insurances;

  return (
    <table className="w-full text-sm text-left text-gray-700 rtl:text-right">
      <thead className="text-sm text-white bg-marine">
        <tr>
          <th scope="col" className="px-6 py-4">
            Full Name
          </th>
          {insuranceCompanies.map((company) => (
            <th
              key={company.value}
              scope="col"
              className={`px-6 py-4 text-center ${visibleColumns[company.value] ? "" : "hidden"}`}
            >
              {company.value}
            </th>
          ))}
          <th scope="col" className="px-6 py-4 text-center">
            Fitpass
          </th>
          <th scope="col" className="px-6 py-4 text-center">
            Debts Due
          </th>
          <th scope="col" className="px-6 py-4 text-center">
            Total Paid
          </th>
        </tr>
      </thead>
      <tbody>
        {employees?.map((employee: Employee) => (
          <tr
            key={employee.id}
            onClick={() => handleRowClick()}
            className="border-b odd:bg-silver hover:bg-marine/40 hover:cursor-pointer even:bg-marine/10"
          >
            <th scope="row" className="px-6 py-4 text-marine whitespace-nowrap">
              {employee.fullName}
            </th>
            {insuranceCompanies.map((company) => (
              <td
                key={company.value}
                className={`px-6 py-4 text-center font-semibold ${visibleColumns[company.value] ? "" : "hidden"} ${employee.healthCareMembers.filter((member) => member.category === "Employee" && member.insurance === company.value).length > 0 ? "text-red-700" : "text-marine"}`}
              >
                {employee.healthCareMembers.filter((member) => member.insurance === company.value).length}
              </td>
            ))}
            <td
              className={`px-6 py-4 text-center font-semibold ${employee.fitpassMembers.filter((member) => member.category === "Employee").length > 0 ? "text-red-700" : "text-marine"}`}
            >
              {employee.fitpassMembers.length}
            </td>
            <td className="px-6 py-4 text-xs font-semibold text-center">0 RSD</td>
            <td className="px-6 py-4 text-xs font-semibold text-center">0 RSD</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
