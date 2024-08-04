import { SelectProps } from "../../types/formTypes";

export default function InputSelect({
  name,
  value,
  onChange,
  options,
  className = "",
  placeholder = "Select an option",
}: SelectProps) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`block w-full p-2 px-0 text-sm bg-transparent border-0 border-b-2 appearance-none text-marine border-marine hover:cursor-pointer focus:outline-none focus:ring-0 focus:border-ash peer ${className}`}
      required
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.value}
        </option>
      ))}
    </select>
  );
}
