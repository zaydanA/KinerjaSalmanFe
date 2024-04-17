import { ChangeEvent } from "react";
import { PiWarningCircle } from "react-icons/pi";

type BaseInputProps = {
  id: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  showLength?: boolean;
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
  maxLength,
  showLength,
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
        {label} <span className="text-red-500">{required ? "*" : ""}</span>
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

        <div className="flex gap-1 justify-between mt-0">
          <div>
            {error && (
            <div className="flex gap-1 items-center">
              <PiWarningCircle className="text-red-500 w-3.5" />
              <p className="text-xs font-normal text-red-500">{error}</p>
            </div>
            )}
          </div>
          <div>
            {showLength && (
              <p className="text-xs font-normal text-gray-400">{String(value)?.length} / {maxLength || "∞"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}