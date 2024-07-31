import { FormData } from "../../types/formTypes";
import InputDate from "./InputDate";

interface DateInputsProps {
  formData: FormData;
  handleDateChange: (name: keyof FormData, date: Date | null) => void;
}

export default function InputDates({ formData, handleDateChange }: DateInputsProps) {
  const dateInputs = [
    {
      name: "Date of Birth",
      selected: formData.birthday,
      setSelected: (date: Date | null) => handleDateChange("birthday", date),
      maxDate: new Date(),
    },
    {
      name: "Contract started",
      selected: formData.contract,
      setSelected: (date: Date | null) => handleDateChange("contract", date),
      maxDate: new Date(),
    },
    {
      name: "Eye doctor",
      selected: formData.eyes,
      setSelected: (date: Date | null) => handleDateChange("eyes", date),
      minDate: new Date(),
    },
    {
      name: "Office safety",
      selected: formData.safety,
      setSelected: (date: Date | null) => handleDateChange("safety", date),
      minDate: new Date(),
    },
    {
      name: "Fire training",
      selected: formData.fire,
      setSelected: (date: Date | null) => handleDateChange("fire", date),
      minDate: new Date(),
    },
    {
      name: "First aid training",
      selected: formData.firstAid,
      setSelected: (date: Date | null) => handleDateChange("firstAid", date),
    },
  ];

  return (
    <div className="grid-box">
      {dateInputs.map((input, index) => (
        <InputDate
          key={index}
          name={input.name}
          selected={input.selected}
          setSelected={input.setSelected}
          maxDate={input.maxDate}
          minDate={input.minDate}
        />
      ))}
    </div>
  );
}
