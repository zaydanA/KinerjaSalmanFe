"use client";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

const Filter = ({
  label,
  filterContent,
  handler,
}: {
  label: string;
  filterContent: { label: string; value: string }[];
  handler: (p: string[]) => void;
}) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      const newValues = [...checkedValues, value]
      setCheckedValues(newValues);
      handler(newValues);
    } else {
      const newValues = checkedValues.filter((item) => item !== value);
      setCheckedValues(newValues);
      handler(newValues);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger className="flex w-fit cursor-pointer items-center rounded-lg border px-4 text-sm max-lg:px-2 max-lg:text-sm max-md:py-0 max-sm:text-[10px]">
        {label}
      </DropdownTrigger>
      <div className="flex bg-red-500">
        <DropdownMenu
          aria-label="Multiple selection example"
          closeOnSelect={false}
          className="text-sm"
        >
          {filterContent.map((f, index) => (
            <DropdownItem key={f.value} className="cursor-default" textValue={f.label}>
              <div className="flex justify-between">
                <label htmlFor={f.label}>{f.label}</label>
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  onChange={(e) => handleCheckboxChange(e, f.value)}
                  checked={checkedValues.includes(f.value)}
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
