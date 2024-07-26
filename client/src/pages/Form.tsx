import { useMutation } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageHeading from "../components/common/PageHeading";
import { employeeJobTitles } from "../components/form/categories";
import InputDate from "../components/form/InputDate";
import InputSelect from "../components/form/InputSelect";
import InputText from "../components/form/InputText";
import InputWellness from "../components/form/InputWellness";
import { CREATE_EMPLOYEE, GET_EMPLOYEES, UPDATE_EMPLOYEE } from "../components/graphql/employee";
import { SvgFitpass, SvgHealth } from "../components/svg/SvgSidebar";
import { FormData, Member } from "../types/formTypes";

const initialFormData: FormData = {
  birthday: null,
  contract: null,
  phoneNumber: "",
  eyes: null,
  safety: null,
  fire: null,
  firstAid: null,
  fullName: "",
  jobTitle: "",
  healthCareMembers: [],
  fitpassMembers: [],
};

export default function Form() {
  const location = useLocation();
  const employeeData = location.state?.employee || null;
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // const [createEmployee] = useMutation(CREATE_EMPLOYEE);
  // const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);

  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });

  const navigate = useNavigate();
  const DEFAULT_DATE = "1900-01-01T00:00:00Z";

  useEffect(() => {
    if (employeeData) {
      setFormData({
        birthday: employeeData.birthday || null,
        contract: employeeData.contract || null,
        phoneNumber: employeeData.phoneNumber || "",
        eyes: employeeData.eyes || null,
        safety: employeeData.safety || null,
        fire: employeeData.fire || null,
        firstAid: employeeData.firstAid || null,
        fullName: employeeData.fullName,
        jobTitle: employeeData.jobTitle || "",
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
      // Prepare the input data
      const inputData = {
        fullName: formData.fullName,
        jobTitle: formData.jobTitle || "Not Specified",
        phoneNumber: formData.phoneNumber || "Not Provided",
        birthday: formData.birthday || DEFAULT_DATE,
        contract: formData.contract || DEFAULT_DATE,
        eyes: formData.eyes || DEFAULT_DATE,
        safety: formData.safety || DEFAULT_DATE,
        fire: formData.fire || DEFAULT_DATE,
        firstAid: formData.firstAid || DEFAULT_DATE,
        healthCareMembers: formData.healthCareMembers.map((member) => ({
          id: member.id !== "" ? member.id.toString() : "",
          name: member.name,
          category: member.category,
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
        // Update existing employee
        const variables = {
          id: employeeData.id,
          input: inputData,
        };
        const { data } = await updateEmployee({
          variables,
        });

        toast.success(`Employee ${data.updateEmployee.fullName} updated successfully!`);
      } else {
        // Create new employee
        const { data } = await createEmployee({
          variables: {
            input: inputData,
          },
        });

        toast.success(`Employee ${data.createEmployee.fullName} created successfully!`);
      }

      // Navigate and reset form after successful operation
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
          title="Health Care Members"
          members={formData.healthCareMembers}
          setMembers={(members) => handleMembersChange("healthCare", members)}
          icon={<SvgHealth addClass="w-6 h-6 me-2 text-white" />}
        />
        <InputWellness
          title="Fitpass Members"
          members={formData.fitpassMembers}
          setMembers={(members) => handleMembersChange("fitpass", members)}
          icon={<SvgFitpass addClass="w-6 h-6 me-2 text-white" />}
        />
      </div>

      <div className="grid-box">
        <InputDate
          name="Date of Birth"
          selected={formData.birthday}
          setSelected={(date) => handleDateChange("birthday", date)}
          maxDate={new Date()}
        />
        <InputDate
          name="Contract started"
          selected={formData.contract}
          setSelected={(date) => handleDateChange("contract", date)}
          maxDate={new Date()}
        />
        <InputDate
          name="Eye doctor"
          selected={formData.eyes}
          setSelected={(date) => handleDateChange("eyes", date)}
          minDate={new Date()}
        />
        <InputDate
          name="Office safety"
          selected={formData.safety}
          setSelected={(date) => handleDateChange("safety", date)}
          minDate={new Date()}
        />
        <InputDate
          name="Fire training"
          selected={formData.fire}
          setSelected={(date) => handleDateChange("fire", date)}
          minDate={new Date()}
        />
        <InputDate
          name="First aid training"
          selected={formData.firstAid}
          setSelected={(date) => handleDateChange("firstAid", date)}
        />
      </div>

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
