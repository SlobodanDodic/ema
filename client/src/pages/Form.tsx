import InputDate from "../components/form/InputDate";
import InputText from "../components/form/InputText";
import "react-datepicker/dist/react-datepicker.css";
import { useState, ChangeEvent } from "react";
import InputWellness from "../components/form/InputWellness";
import { SvgFitpass, SvgHealth } from "../components/svg/SvgSidebar";
import SvgLogo from "../components/svg/SvgLogo";

type FormData = {
  birthday: Date | null;
  contract: Date | null;
  phoneNumber: string;
  eyes: Date | null;
  safety: Date | null;
  fire: Date | null;
  firstAid: Date | null;
  fullName: string;
  jobTitle: string;
  healthCareMembers: Member[];
  fitpassMembers: Member[];
};

interface Member {
  name: string;
  category: string;
  start: Date | null;
  end: Date | null;
}

export default function Form() {
  const [formData, setFormData] = useState<FormData>({
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
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  console.log(formData);

  return (
    <div>
      <div className="flex items-center justify-between p-4 rounded text-stone-50 bg-stone-700">
        <p>Employee Data Form</p>
        <SvgLogo addClass="w-7 h-7" color="#fafaf9" />
      </div>

      <div className="pb-2 grid-box-text">
        <InputText name="fullName" label="Full name" onChange={handleInputChange} />
        <InputText name="jobTitle" label="Job title" onChange={handleInputChange} />
        <InputText name="phoneNumber" label="Phone Number" type="tel" onChange={handleInputChange} />
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
        <InputDate name="Date of Birth" selected={formData.birthday} setSelected={(date) => handleDateChange("birthday", date)} />
        <InputDate
          name="Contract started"
          selected={formData.contract}
          setSelected={(date) => handleDateChange("contract", date)}
        />
        <InputDate name="Eye doctor" selected={formData.eyes} setSelected={(date) => handleDateChange("eyes", date)} />
        <InputDate name="Office safety" selected={formData.safety} setSelected={(date) => handleDateChange("safety", date)} />
        <InputDate name="Fire training" selected={formData.fire} setSelected={(date) => handleDateChange("fire", date)} />
        <InputDate
          name="First aid training"
          selected={formData.firstAid}
          setSelected={(date) => handleDateChange("firstAid", date)}
        />
      </div>
    </div>
  );
}
