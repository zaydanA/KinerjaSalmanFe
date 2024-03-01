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
            <th key={index} className=" sticky left-0 shadow-slate-500">
              {h}
            </th>
          ) : (
            <th key={index} className=" px-3.5">
              {h}
            </th>
          )
        )}
        {action ? <th className="sticky right-0 px-10"></th> : ""}
      </tr>
    </thead>
  );
};

export default TableHeader;
