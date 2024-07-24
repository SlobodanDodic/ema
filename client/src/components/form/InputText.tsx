import { InputTextProps } from "../../types/formTypes";

export default function InputText({ name, label, onChange, value, type = "text" }: InputTextProps) {
  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="block w-full px-0 pt-3 pb-1 text-sm bg-transparent border-0 border-b-2 appearance-none text-marine border-marine focus:border-steel focus:outline-none focus:ring-0 peer"
      />
      <label
        htmlFor={name}
        className="peer-focus:font-medium absolute text-sm text-marine duration-300 transform -translate-y-6 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-steel peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  );
}
