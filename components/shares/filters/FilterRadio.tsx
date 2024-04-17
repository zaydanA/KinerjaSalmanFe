"use client";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

const FilterRadio = ({
  label,
  filterContent,
  handler,
  defaultVal
}: {
  label: string;
  filterContent: { label: string; value: number }[];
  handler: (p: number | undefined) => void;
  defaultVal?: number;
}) => {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(defaultVal);

  const handleRadioChange = (value: number) => {
    const newSelectedValue = selectedValue === value ? undefined : value;
    setSelectedValue(newSelectedValue);
    handler(newSelectedValue);
  };

  return (
    <Dropdown
      shouldBlockScroll={false}
    >
      <DropdownTrigger className="flex w-fit cursor-pointer items-center rounded-lg border px-4 text-sm max-lg:px-2 max-lg:text-sm max-md:py-0 max-sm:text-[10px]">
        {label}
      </DropdownTrigger>
      <div className="flex bg-red-500">
        <DropdownMenu
          aria-label="Single selection example"
          closeOnSelect={false}
          className="text-sm max-h-48 overflow-y-auto"
        >
          {filterContent.map(({ label, value }, index) => (
            <DropdownItem key={value} className="cursor-pointer">
              <div className="flex justify-between items-center">
                <label htmlFor={String(value)}>{label}</label>
                <input
                  type="checkbox"
                  id={label}
                  name={label}
                  value={value}
                  checked={selectedValue === value}
                  onChange={() => handleRadioChange(value)}
                  className="cursor-pointer"
                />
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </div>
    </Dropdown>
  );
};

export default FilterRadio;
