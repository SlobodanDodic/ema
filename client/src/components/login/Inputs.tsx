interface Props {
  inputName: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Inputs({ inputName, value, onChange }: Props) {
  return (
    <div className="relative">
      <input
        // id={inputName}
        name={inputName}
        type={inputName === "password" ? "password" : "text"}
        className="w-full h-8 mt-1 placeholder-transparent border-b text-stone-700 border-stone-300 peer focus:outline-none focus:border-amber-600"
        placeholder={inputName}
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor={inputName}
        className="absolute left-0 text-sm transition-all duration-300 -top-3 text-stone-300 peer-placeholder-shown:text-amber-600 peer-placeholder-shown:top-3 peer-focus:text-amber-600 peer-focus:-top-3"
      >
        {inputName}
      </label>
    </div>
  );
}
