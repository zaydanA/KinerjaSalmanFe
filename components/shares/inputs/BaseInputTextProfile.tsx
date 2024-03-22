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
      <div className={`${error? "":"mb-4"} relative`}>
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
          className={
            `
            rounded outline-none w-full px-2 py-1 transition-all ease-in-out text-sm placeholder-gray-300
            ${disabled 
              ? "bg-white" 
              : (
                  error 
                  ? "shadow-input-error focus:shadow-input-focus-error" 
                  : "border-1 hover:shadow-input-hover focus:shadow-input-focus"
                )
            }`
          }
        />

        {needEye && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-[--kinerja-gold]">
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
          {error && <PiWarningCircle className="text-red-500"/>}
          <p className="text-sm font-light text-red-500 text-clr-text-danger">{error}</p>
        </div>
      )}
    </div>
  );
}