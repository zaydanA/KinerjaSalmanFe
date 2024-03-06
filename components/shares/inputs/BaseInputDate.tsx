import { ChangeEvent } from "react";
import { PiWarningCircle } from "react-icons/pi";

export type BaseInputDateType = {
  id: string;
  label: string;
  value: string;
  error?: string;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
};

const BaseInputDate: React.FC<BaseInputDateType> = ({
  id,
  label,
  value,
  error = "",
  setValue,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-base block w-fit text-clr-text-primary"
      >
        {label}
      </label>
      <input
        id={id}
        type="date"
        value={value}
        onChange={setValue}
        className={`rounded shadow-input outline-none w-full box-border px-3 py-3.5 transition-all ease-in-out bg-clr-background-base-two text-sm placeholder-clr-text-primary-darken ${
          error
            ? "shadow-input-error focus:shadow-input-focus-error"
            : "hover:shadow-input-hover focus:shadow-input-focus"
        }`}
      />
      {error && (
        <div className="flex gap-2 items-center">
          <PiWarningCircle />
          <p className="text-sm font-thin text-clr-text-danger">{error}</p>
        </div>
      )}
    </div>
  );
};

export default BaseInputDate;
