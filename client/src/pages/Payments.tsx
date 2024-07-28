import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import PageHeading from "../components/common/PageHeading";
import { GET_EMPLOYEES } from "../components/graphql/employee";
import PaymentsDetails from "../components/payments/PaymentsDetails";
import { Employee } from "../types/common";
// import FeesModal from "../components/payments/FeesModal";
// import useToggle from "../hooks/useToggle";

export default function Payments() {
  const { data } = useQuery(GET_EMPLOYEES);
  const [employees, setEmployees] = useState<Employee[]>([]);
  // const [isModalOpen, setIsModalOpen] = useToggle(false);

  useEffect(() => {
    if (data) {
      setEmployees(data?.findAllEmployees);
    }
  }, [data]);

  const handleRowClick = () => {
    console.log("Row clicked");
  };

  // const membersCount = 10;
  // const membershipFee = 50;
  // const fixedObligation = 1000;

  // function calculateMonthlyObligation() {
  //   const today = new Date();
  //   const isFirstOfMonth = today.getDate() === 1;

  //   if (isFirstOfMonth) {
  //     const totalAmount = membersCount * membershipFee + fixedObligation;
  //     console.log(`Total Amount on ${today.toDateString()}: ${totalAmount}`);
  //     return totalAmount;
  //   } else {
  //     console.log("Not the 1st of the month. Calculation not performed.");
  //     return null;
  //   }
  // }

  // calculateMonthlyObligation();

  return (
    <div>
      <PageHeading title="Payments" />

      {/* <button
        type="button"
        onClick={() => setIsModalOpen()}
        className="inline-flex items-center px-5 py-2 mt-6 mb-2 text-sm font-medium text-center text-white rounded bg-marine hover:bg-marine/90 focus:ring-2 focus:outline-none focus:ring-marine/70"
      >
        Membership Fees
      </button>

      {isModalOpen && (
        <div
          id="defaultModal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed -top-[1px] -left-[2px] right-0 z-50 flex items-center justify-center w-[101%] h-[101%] overflow-x-hidden overflow-y-auto bg-midnight border-midnight rounded"
        >
          <FeesModal toggleModal={() => setIsModalOpen()} />
        </div>
      )} */}

      <PaymentsDetails employees={employees} handleRowClick={handleRowClick} />
    </div>
  );
}
