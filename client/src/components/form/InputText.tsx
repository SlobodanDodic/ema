import { InputTextProps } from "../../types/formTypes";

export default function InputText({ name, label, onChange, type = "text" }: InputTextProps) {
  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        placeholder=" "
        required
        className="block w-full px-0 pt-3 pb-1 text-sm bg-transparent border-0 border-b-2 appearance-none text-stone-600 border-stone-600 focus:border-amber-600 focus:outline-none focus:ring-0 peer"
      />
      <label
        htmlFor={name}
        className="peer-focus:font-medium absolute text-sm text-stone-600 duration-300 transform -translate-y-6 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  );
}
