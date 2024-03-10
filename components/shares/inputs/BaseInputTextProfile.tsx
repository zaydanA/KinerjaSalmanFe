import { ChangeEvent, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { PiWarningCircle } from "react-icons/pi";

export type BaseInputType = {
  id: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  type?: "number" | "text" | "password" | "password-no-eye" | "date";
  value: string;
  error?: string;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function BaseInputText({
  id,
  label,
  placeholder = "",
  disabled = false,
  type = "text",
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
    <div className="flex flex-col">
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
          className={`rounded shadow-input outline-none w-full box-border px-2 py-1 transition-all ease-in-out bg-clr-background-base-two text-sm placeholder-clr-text-primary-darken ${
            error
              ? "shadow-input-error focus:shadow-input-focus-error"
              : "hover:shadow-input-hover focus:shadow-input-focus"
          }
          ${disabled ? "bg-clr-background-base-one bg-white" : " border-1 border-gray-400"}`}
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
      </div>

      {error && (
        <div className="flex gap-2 items-center">
          <PiWarningCircle />
          <p className="text-sm font-thin text-clr-text-danger">{error}</p>
        </div>
      )}
    </div>
  );
}