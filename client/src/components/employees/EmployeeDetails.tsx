import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYEE } from "../../graphql/employee";
import Loading from "../../pages/Loading";
import PageHeading from "../common/PageHeading";
import BasicCard, { BasicCardProps } from "./BasicCard";
import moment from "moment";
import { Employee } from "../../types/common";
import MembersInfo from "./MembersInfo";
import PaymentsInfo from "./PaymentsInfo";

export default function EmployeeDetails() {
  const { id } = useParams();
  const {
    data: employeeDetails,
    loading,
    error,
  } = useQuery(GET_EMPLOYEE, {
    variables: { id },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const employeeData: Employee = employeeDetails?.getOneEmployee;

  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return "N/A";
    return moment(date).format("DD MMM YYYY");
  };

  const basicDataArray = [
    { title: "Birthday", text: formatDate(employeeData?.birthday) },
    { title: "Contract", text: formatDate(employeeData?.contract) },
    { title: "Eyes Check", text: formatDate(employeeData?.eyes) },
    { title: "Safety Training", text: formatDate(employeeData?.safety) },
    { title: "Fire Safety", text: formatDate(employeeData?.fire) },
    { title: "First Aid", text: formatDate(employeeData?.firstAid) },
  ];

  const formatPhoneNumber = (phoneNumber: string | undefined) => {
    if (!phoneNumber) return "N/A";
    return phoneNumber.replace(/^(\+381)(\d{2})(\d+)/, "$1 $2 $3");
  };

  return (
    <>
      <PageHeading title="Employee Details" />

      <div className="flex flex-col items-center justify-center">
        <h1 className="mt-6 mb-2 font-bold tracking-wider text-center uppercase rounded w-fit text-marine">
          {employeeData?.fullName}
        </h1>
        <h3 className="italic font-medium text-center underline text-marine">{employeeData?.jobTitle}</h3>
        <h3 className="mt-2 font-bold text-center text-shadow text-oranje">{formatPhoneNumber(employeeData?.phoneNumber)}</h3>
      </div>

      <div className="flex flex-col p-2 mx-auto my-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
          {basicDataArray.map((basicData: BasicCardProps) => (
            <BasicCard key={basicData.title} title={basicData.title} text={basicData.text} />
          ))}
        </div>

        <PaymentsInfo employeeData={employeeData} formatDate={formatDate} />

        <MembersInfo employeeData={employeeData} formatDate={formatDate} />
      </div>
    </>
  );
}
