"use client";
import React from "react";

const TableHeader = ({
  headers,
  action,
}: {
  headers: string[];
  action?: boolean;
}) => {
  return (
    <thead>
      <tr>
        {headers.map((h, index) =>
          index == 0 ? (
            <th
              key={index}
              className=" -border-b--clr-table-border sticky left-0 top-0 z-[2] whitespace-nowrap border-b-1 border-r-1 border-solid bg-clr-blackground-table-header p-4 px-3.5 text-start max-lg:text-sm max-md:text-xs"
            >
              {h}
            </th>
          ) : (
            <th
              key={index}
              className=" -border-b--clr-table-border sticky top-0 z-[1] whitespace-nowrap border-b-1 border-solid bg-clr-blackground-table-header p-4 px-3.5 text-start max-lg:text-sm max-md:text-xs"
            >
              {h}
            </th>
          ),
        )}
        {action ? (
          <th className="-border-b--clr-table-border sticky right-0 top-0 z-[1] whitespace-nowrap border-b-1 border-l-1 border-solid bg-clr-blackground-table-header p-4 px-10 text-start max-lg:text-sm max-md:px-4 max-md:text-xs"></th>
        ) : (
          ""
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
