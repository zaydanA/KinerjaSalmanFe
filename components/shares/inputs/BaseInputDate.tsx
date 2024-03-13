import { ChangeEvent } from "react";
import { PiWarningCircle } from "react-icons/pi";

export type BaseInputDateType = {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  error?: string;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
};

const BaseInputDate: React.FC<BaseInputDateType> = ({
  id,
  label,
  required = false,
  value,
  error = "",
  setValue,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-sm font-medium block w-fit text-black"
      >
        {label} {required ? "*" : ""}
      </label>
      <div>
        <input
          id={id}
          type="date"
          value={value}
          onChange={setValue}
          className={`rounded shadow-input outline-none w-full box-border p-3 transition-all ease-in-out bg-white text-sm placeholder-gray-300 ${
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
