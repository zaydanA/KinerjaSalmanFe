import { ChangeEvent, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { PiWarningCircle } from "react-icons/pi";

type BaseInputType = {
  id: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  type?: "number" | "text" | "password" | "password-no-eye" | "date";
  required?: boolean;
  value?: string;
  error?: string;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function BaseInputText({
  id,
  label,
  placeholder = "",
  disabled = false,
  type = "text",
  required = false,
  value,
  error = "",
  setValue,
}: BaseInputType) {
  const needEye = type === "password";
  const typeInput = type === "password-no-eye" ? "password" : type;

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-sm font-medium block w-fit text-black"
      >
        {label} {required ? "*" : ""}
      </label>

      <div className="relative">
        <input
          id={id}
          type={
            typeInput === "password"
              ? showPassword
                ? "text"
                : "password"
              : typeInput
          }
          placeholder={placeholder}
          value={value}
          onChange={setValue}
          disabled={disabled}
          className={`rounded shadow-input outline-none w-full box-border p-3 transition-all ease-in-out bg-white text-sm placeholder-gray-300 ${
            error
              ? "shadow-input-error focus:shadow-input-focus-error"
              : "hover:shadow-input-hover focus:shadow-input-focus"
          }
          ${disabled ? "bg-clr-background-base-one" : ""}`}
        />

        {needEye && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              type="button"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        )}

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