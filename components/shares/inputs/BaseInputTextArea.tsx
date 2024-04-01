import { ChangeEvent } from "react";
import { PiWarningCircle } from "react-icons/pi";

type BaseInputProps = {
  id: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  error?: string;
  setValue: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function BaseInputTextArea({
  id,
  label,
  placeholder = "",
  disabled = false,
  required = false,
  value,
  error = "",
  setValue,
}: BaseInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-sm font-medium block w-fit text-black"
      >
        {label} {required ? "*" : ""}
      </label>

      <div className="relative">
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={setValue}
          disabled={disabled}
          className={
            `
            rounded outline-none w-full p-3 transition-all ease-in-out text-sm placeholder-gray-300
            ${disabled 
              ? "bg-gray-100 text-gray-400 shadow-input" 
              : (
                  error 
                  ? "shadow-input-error focus:shadow-input-focus-error" 
                  : "shadow-input hover:shadow-input-hover focus:shadow-input-focus"
                )
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
}