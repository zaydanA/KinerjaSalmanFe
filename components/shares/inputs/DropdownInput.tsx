import React from 'react';

export type DropdownInputType = {
  id: string;
  label: string;
  options: Array<{ value: string; label: string }>;
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  error?: string;
};

const DropdownInput: React.FC<DropdownInputType> = ({
  id,
  label,
  options,
  selectedValue,
  onChange,
  disabled = false,
  error = '',
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-base block w-fit text-clr-text-primary">
        {label}
      </label>
      <select
        id={id}
        value={selectedValue}
        onChange={onChange}
        disabled={disabled}
        className={`rounded shadow-input outline-none w-full box-border px-3 py-3.5 transition-all ease-in-out bg-clr-background-base-two text-sm placeholder-clr-text-primary-darken ${error ? 'shadow-input-error focus:shadow-input-focus-error' : 'hover:shadow-input-hover focus:shadow-input-focus'}
        ${disabled ? 'bg-clr-background-base-one' : ''}`}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <div className="flex gap-2 items-center">
          <p className="text-sm font-thin text-clr-text-danger">{error}</p>
        </div>
      )}
    </div>
  );
};

export default DropdownInput;
