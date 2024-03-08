'use client'
import React, { useMemo, useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

const Filter = (
  { label, 
    filterContent, 
    handler } 
    : 
  { label: string;
   filterContent: string[];
   handler: React.Dispatch<React.SetStateAction<string[]>>;
  } ) => {

  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedValues([...checkedValues, value]);
    } else {
      setCheckedValues(checkedValues.filter((item) => item !== value));
    }
  };

  useMemo(
    () => handler(checkedValues),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checkedValues]
  );

  return (
    <Dropdown>
      <DropdownTrigger className="text-sm w-fit cursor-pointer border rounded-lg px-4 flex items-center">
        {label}
      </DropdownTrigger>
      <div className="flex bg-red-500">
        <DropdownMenu aria-label="Multiple selection example" closeOnSelect={false} className="text-sm">
          {filterContent.map((f, index) => (
            <DropdownItem key={f} className="cursor-default" textValue={f}>
              <div className="flex justify-between">
                <label htmlFor={f}>{f}</label>
                <input 
                  type="checkbox" 
                  className="cursor-pointer" 
                  onChange={(e) => handleCheckboxChange(e, f)}
                  checked={checkedValues.includes(f)}
                   />
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </div>
    </Dropdown>
  );
};

export default Filter;