import { Employee } from "../../types/common";

export default function MembersInfo({
  employeeData,
  formatDate,
}: {
  employeeData: Employee;
  formatDate: (date: string | Date | null | undefined) => string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col items-center p-3 m-3">
        <h3 className="mb-4 text-xl font-semibold text-shadow text-oranje">Health Care Members:</h3>
        {employeeData?.healthCareMembers.length > 0 ? (
          employeeData.healthCareMembers.map((member) => (
            <div key={member.id} className="w-full p-6 mb-6 rounded shadow-inner min-w-72 lg:w-1/2 shadow-marine text-marine">
              <p className="mb-2">
                <strong className="">Name:</strong> {member.name}
              </p>
              <p className="mb-2">
                <strong className="">Insurance:</strong> {member.insurance}
              </p>
              <p className="mb-2">
                <strong className="">Category:</strong> {member.category}
              </p>
              <p className="mb-2">
                <strong className="">Start:</strong> {formatDate(member.start)}
              </p>
              <p className="mb-2">
                <strong className="">End:</strong> {formatDate(member.end)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No health care members</p>
        )}
      </div>
      <div className="flex flex-col items-center p-3 m-3">
        <h3 className="mb-4 text-xl font-semibold text-shadow text-oranje">Fitpass Members:</h3>
        {employeeData?.fitpassMembers.length > 0 ? (
          employeeData.fitpassMembers.map((member) => (
            <div key={member.id} className="w-full p-6 mb-6 rounded shadow-inner min-w-72 lg:w-1/2 shadow-marine text-marine">
              <p className="mb-2">
                <strong className="">Name:</strong> {member.name}
              </p>
              <p className="mb-2">
                <strong className="">Category:</strong> {member.category}
              </p>
              <p className="mb-2">
                <strong className="">Start:</strong> {formatDate(member.start)}
              </p>
              <p className="mb-2">
                <strong className="">End:</strong> {formatDate(member.end)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No health care members</p>
        )}
      </div>
    </div>
  );
}
