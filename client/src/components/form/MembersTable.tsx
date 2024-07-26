import moment from "moment";
import { MembersTableProps } from "../../types/formTypes";

export default function MembersTable({ title, members, handleEditMember, handleDeleteMember }: MembersTableProps) {
  return (
    <>
      <div className="py-4 text-sm font-semibold border-t text-marine border-marine/20">{title} Members:</div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 rtl:text-right">
          <thead className="text-sm text-white bg-marine">
            <tr>
              <th scope="col" className="px-6 py-4">
                Member name
              </th>
              <th scope="col" className="px-6 py-4">
                Category
              </th>
              <th scope="col" className="px-6 py-4">
                Start date
              </th>
              <th scope="col" className="px-6 py-4">
                End Date
              </th>
              <th scope="col" className="px-6 py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b odd:bg-white even:bg-marine/10">
                <th scope="row" className="px-6 py-4 text-marine whitespace-nowrap">
                  {member.name}
                </th>
                <td className="px-6 py-4 text-marine">{member.category}</td>
                <td className="px-6 py-4 text-marine">{member.start ? moment(member.start).format("L") : "N/A"}</td>
                <td className="px-6 py-4 text-marine">{member.end ? moment(member.end).format("L") : "N/A"}</td>

                <td className="px-6 py-4">
                  <button type="button" onClick={() => handleEditMember(member)} className="me-5 text-marine hover:text-sky-600">
                    ✎
                  </button>
                  <button type="button" onClick={() => handleDeleteMember(member.id)} className="text-marine hover:text-red-700">
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
