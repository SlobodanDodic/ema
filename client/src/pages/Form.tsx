import { useMutation } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageHeading from "../components/common/PageHeading";
import { employeeJobTitles } from "../components/data/categories";
import InputSelect from "../components/form/InputSelect";
import InputText from "../components/form/InputText";
import InputWellness from "../components/form/InputWellness";
import { CREATE_EMPLOYEE, GET_EMPLOYEES, UPDATE_EMPLOYEE } from "../components/graphql/employee";
import { FormData, Member } from "../types/formTypes";
import { initialDate, initialDateBirthday, initialDateContract, initialFormData } from "../components/form/initialFormData";
import { Icon } from "../components/common/Icon";
import { IconNotesMedical, IconWeightLifter } from "../components/svg";
import InputDates from "../components/form/InputDates";

export default function Form() {
  const location = useLocation();
  const employeeData = location.state?.employee || null;
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (employeeData) {
      setFormData({
        fullName: employeeData.fullName,
        jobTitle: employeeData.jobTitle || "",
        birthday: employeeData.birthday || null,
        contract: employeeData.contract || null,
        phoneNumber: employeeData.phoneNumber || "",
        eyes: employeeData.eyes || null,
        safety: employeeData.safety || null,
        fire: employeeData.fire || null,
        firstAid: employeeData.firstAid || null,
        healthCareMembers: employeeData.healthCareMembers,
        fitpassMembers: employeeData.fitpassMembers,
      });
    }
  }, [employeeData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (name: keyof FormData, date: Date | null) => {
    setFormData((prevData) => ({ ...prevData, [name]: date }));
  };

  const handleMembersChange = (type: "healthCare" | "fitpass", members: Member[]) => {
    setFormData((prevData) => ({
      ...prevData,
      [type === "healthCare" ? "healthCareMembers" : "fitpassMembers"]: members,
    }));
  };

  const handleSubmit = async () => {
    try {
      const inputData = {
        fullName: formData.fullName,
        jobTitle: formData.jobTitle || "Not Specified",
        phoneNumber: formData.phoneNumber || "Not Provided",
        birthday: formData.birthday || initialDateBirthday,
        contract: formData.contract || initialDateContract,
        eyes: formData.eyes || initialDate,
        safety: formData.safety || initialDate,
        fire: formData.fire || initialDate,
        firstAid: formData.firstAid || initialDate,
        healthCareMembers: formData.healthCareMembers.map((member) => ({
          id: member.id !== "" ? member.id.toString() : "",
          name: member.name,
          category: member.category,
          insurance: member.insurance,
          start: member.start,
          end: member.end,
        })),
        fitpassMembers: formData.fitpassMembers.map((member) => ({
          id: member.id !== "" ? member.id.toString() : "",
          name: member.name,
          category: member.category,
          start: member.start,
          end: member.end,
        })),
      };

      if (employeeData?.id) {
        const variables = {
          id: employeeData.id,
          input: inputData,
        };
        const { data } = await updateEmployee({
          variables,
        });

        toast.success(`Employee ${data.updateEmployee.fullName} updated successfully!`);
      } else {
        const { data } = await createEmployee({
          variables: {
            input: inputData,
          },
        });

        toast.success(`Employee ${data.createEmployee.fullName} created successfully!`);
      }

      navigate("/employees", { replace: true });
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while saving the employee.");
    }
  };

  return (
    <div>
      <PageHeading title="Employee Data Form" />

      <div className="grid-box-text">
        <InputText name="fullName" label="Full name" value={formData.fullName} onChange={handleInputChange} />
        <InputSelect
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleInputChange}
          options={employeeJobTitles}
          placeholder="Select job title"
          className="mb-5"
        />
        <InputText name="phoneNumber" label="Phone Number" type="tel" value={formData.phoneNumber} onChange={handleInputChange} />
      </div>

      <div className="grid-box">
        <InputWellness
          beneficiary={formData?.fullName}
          title="Health Care Members"
          members={formData?.healthCareMembers}
          setMembers={(members) => handleMembersChange("healthCare", members)}
          icon={<Icon icon={IconNotesMedical} className="w-6 h-6 text-white me-2" />}
        />
        <InputWellness
          beneficiary={formData?.fullName}
          title="Fitpass Members"
          members={formData?.fitpassMembers}
          setMembers={(members) => handleMembersChange("fitpass", members)}
          icon={<Icon icon={IconWeightLifter} className="w-6 h-6 text-white me-2" />}
        />
      </div>

      <InputDates formData={formData} handleDateChange={handleDateChange} />

      <div className="flex justify-center my-8">
        <button
          className={`px-4 py-2 rounded-sm text-silver ${
            !formData.fullName.trim() ? "bg-marine/80 cursor-not-allowed" : "hover:bg-marine/90 bg-marine"
          }`}
          onClick={handleSubmit}
          disabled={!formData.fullName.trim()}
        >
          {employeeData?.id ? "Update Employee" : "Create Employee"}
        </button>
      </div>
    </div>
  );
}
