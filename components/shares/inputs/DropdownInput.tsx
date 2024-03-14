// import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import React from 'react';
import { PiWarningCircle } from 'react-icons/pi';

export type DropdownInputType = {
  id: string;
  label: string;
  options: Array<{ value: string | number; label: string }>;
  selectedValue: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
};

const DropdownInput: React.FC<DropdownInputType> = ({
  id,
  label,
  options,
  selectedValue,
  onChange,
  required = false,
  disabled = false,
  error = '',
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium block w-fit">
        {label} {required ? "*" : ""}
      </label>
      <div>
        <select
          id={id}
          value={selectedValue}
          onChange={onChange}
          disabled={disabled}
          className={
            `
            rounded outline-none w-full p-3 transition-all ease-in-out text-sm placeholder-gray-300
            ${disabled 
              ? "bg-white" 
              : (
                  error 
                  ? "shadow-input-error focus:shadow-input-focus-error" 
                  : "shadow-input hover:shadow-input-hover focus:shadow-input-focus"
                )
            }`
          }
        >
          <option key="" className="" disabled value={(typeof selectedValue === 'string' ? '' : -1)}>
            {`Select ${label}`}
          </option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* <Dropdown>
          <DropdownTrigger className='rounded outline-none w-full p-3 transition-all ease-in-out text-sm placeholder-gray-300 shadow-input box-border hover:shadow-input-hover focus:shadow-input-focus'>
            <Button 
              variant="flat" 
              className="bg-white"
            >
              {`Select ${label}`}
            </Button>
          </DropdownTrigger>
          <DropdownMenu 
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedValue}
              onSelectionChange={onChange}
              >
              {options.map((option)=>(
                <DropdownItem key={option.value}>
                  {option.label}
                </DropdownItem>
              ))}
        </DropdownMenu>
      </Dropdown> */}

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

export default DropdownInput;
