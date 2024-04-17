import { ChangeEvent, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { PiWarningCircle } from "react-icons/pi";
import { NumericFormat, PatternFormat } from "react-number-format";

export type BaseInputType = {
  id: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  type?: "number" | "text" | "password" | "password-no-eye" | "date" | "currencies";
  required?: boolean;
  maxLength?: number;
  fixedLength?: number;
  showLength?: boolean;
  format?: string;
  toUppercase?: boolean;
  value?: string | number;
  error?: string;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function BaseInputTextProfile({
  id,
  label,
  placeholder = label,
  disabled = false,
  type = "text",
  required = false,
  maxLength,
  fixedLength,
  showLength,
  format,
  toUppercase,
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
        {type === "currencies" ? (
          <NumericFormat
            id={id}
            placeholder={placeholder}
            disabled={disabled}
            className={
              `
              rounded outline-none w-full px-2 py-1 transition-all ease-in-out text-sm placeholder-gray-300
              ${disabled 
                ? "bg-white" 
                : (
                    error 
                    ? "shadow-input-error focus:shadow-input-focus-error" 
                    : "border-1 border-clr-kinerja-gold hover:shadow-input-hover focus:shadow-input-focus"
                  )
              }`
            }
            value={value}
            prefix="Rp"
            thousandSeparator="."
            decimalSeparator=","
            onChange={setValue}
            allowNegative={false}
          />
        ) : (
          fixedLength ? (
            <PatternFormat
              id={id}
              placeholder={placeholder}
              valueIsNumericString={type === "number"}
              disabled={disabled}
              onInput={toUppercase ? (e : any) => e.target.value = ("" + e.target.value).toUpperCase() : undefined}
              className={
                `
                rounded outline-none w-full px-2 py-1 transition-all ease-in-out text-sm placeholder-gray-300
                ${disabled 
                  ? "bg-white" 
                  : (
                      error 
                      ? "shadow-input-error focus:shadow-input-focus-error" 
                      : "border-1 border-clr-kinerja-gold hover:shadow-input-hover focus:shadow-input-focus"
                    )
                }`
              }
              value={value}
              onChange={setValue}
              format={format ?? Array.from({ length: fixedLength }, () => '#').join('')}
            />
          ) : (
            <input
              id={id}
              type={
                typeInput === "password" ? (showPassword ? "text" : "password") : typeInput
              }
              placeholder={placeholder}
              value={value}
              onChange={setValue}
              maxLength={maxLength}
              disabled={disabled}
              onInput={toUppercase ? (e : any) => e.target.value = ("" + e.target.value).toUpperCase() : undefined}
              className={
                `
                rounded outline-none w-full px-2 py-1 transition-all ease-in-out text-sm placeholder-gray-300
                ${disabled 
                  ? "bg-white" 
                  : (
                      error 
                      ? "shadow-input-error focus:shadow-input-focus-error" 
                      : "border-1 border-gray-300 hover:shadow-input-hover focus:shadow-input-focus"
                    )
                }`
              }
            />
          )
        )}

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

        <div className="flex gap-1 justify-between mt-1">
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
              <p className="text-xs font-normal text-gray-400">{String(value)?.length} / {maxLength || fixedLength || "∞"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}