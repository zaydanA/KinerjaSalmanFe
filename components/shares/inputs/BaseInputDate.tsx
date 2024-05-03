import { ChangeEvent } from "react";
import { PiWarningCircle } from "react-icons/pi";

export type BaseInputDateType = {
  id: string;
  label: string;
  required?: boolean;
  maxToday?: boolean;
  disabled?: boolean;
  type?: "date" | "month";
  value?: string;
  error?: string;
  setValue?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const BaseInputDate: React.FC<BaseInputDateType> = ({
  id,
  label,
  required = false,
  maxToday = false,
  disabled = false,
  type = "date",
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
          type={type}
          value={value}
          disabled={disabled}
          max={maxToday ? setMaxDate() : undefined}
          onChange={setValue}
          className={
            `
            rounded outline-none w-full p-3 transition-all ease-in-out text-sm placeholder-gray-300
            ${disabled
              ? "bg-gray-100 text-gray-400 shadow-input"
              : error
              ? "shadow-input-error focus:shadow-input-focus-error"
              : "shadow-input hover:shadow-input-hover focus:shadow-input-focus"
            }`
          }
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
