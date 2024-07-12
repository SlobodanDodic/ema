import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type InputDateProps = {
  selected: Date | null;
  setSelected: (date: Date | null) => void;
  name: string;
};

export default function InputDate({ selected, setSelected, name }: InputDateProps) {
  return (
    <div className="flex items-center mb-5">
      <label className="w-1/4 text-sm me-4 text-stone-600">{name}</label>
      <DatePicker
        selected={selected}
        onChange={(date: Date | null) => setSelected(date)}
        dateFormat="dd. MMM yyyy"
        enableTabLoop={false}
        placeholderText={name}
        className="block w-full p-2 text-sm text-white border rounded border-stone-300"
        showIcon
        icon={
          <svg width="1em" height="1em" viewBox="0 0 48 48">
            <mask id="ipSApplication0">
              <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                <path
                  fill="#fff"
                  d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                ></path>
              </g>
            </mask>
            <path fill="white" d="M0 0h48v48H0z" mask="url(#ipSApplication0)"></path>
          </svg>
        }
      />
    </div>
  );
}
