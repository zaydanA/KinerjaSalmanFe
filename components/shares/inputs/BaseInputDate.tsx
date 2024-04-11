import { ChangeEvent } from "react";
import { PiWarningCircle } from "react-icons/pi";

export type BaseInputDateType = {
  id: string;
  label: string;
  required?: boolean;
  maxToday?: boolean;
  value: string;
  error?: string;
  setValue?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const BaseInputDate: React.FC<BaseInputDateType> = ({
  id,
  label,
  required = false,
  maxToday = false,
  value,
  error = "",
  setValue,
}) => {
  const setMaxDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-sm font-medium block w-fit text-black"
      >
        {label} <span className="text-red-500">{required ? "*" : ""}</span>
      </label>
      <div>
        <input
          id={id}
          type="date"
          value={value}
          max={maxToday ? setMaxDate() : undefined}
          onChange={setValue}
          className={`rounded shadow-input outline-none w-full box-border px-3 py-[11px] transition-all ease-in-out bg-white text-sm placeholder-gray-300 ${
            error
              ? "shadow-input-error focus:shadow-input-focus-error"
              : "hover:shadow-input-hover focus:shadow-input-focus"
          }`}
        />
        {error && (
          <div className="flex gap-1 items-center mt-1">
            <PiWarningCircle className="text-red-500 w-3.5" />
            <p className="text-xs font-normal text-red-500">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseInputDate;
