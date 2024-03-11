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
  filterContent: string[];
  handler: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedValues([...checkedValues, value]);
    } else {
      setCheckedValues(checkedValues.filter((item) => item !== value));
    }
  };

  useEffect(
    () => handler(checkedValues),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checkedValues],
  );

  return (
    <Dropdown>
      <DropdownTrigger className="flex w-fit cursor-pointer items-center rounded-lg border px-4 text-sm max-lg:px-2 max-lg:text-sm max-md:py-0">
        {label}
      </DropdownTrigger>
      <div className="flex bg-red-500">
        <DropdownMenu
          aria-label="Multiple selection example"
          closeOnSelect={false}
          className="text-sm"
        >
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
