"use client";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { MdOpenInNew } from "react-icons/md";

const TableData = ({
  dataContent,
  onClickEdit,
  onClickOpen,
  onClickDelete,
  isProfile,
}: {
  dataContent: (string | number | undefined)[];
  onClickEdit?: () => void;
  onClickOpen?: () => void;
  onClickDelete?: () => void;
  isProfile: boolean;
}) => {
  const profileColumn = (
    <td className="-border-b--clr-table-border sticky left-0 flex whitespace-nowrap border-b-1 border-r-1 border-solid bg-clr-blackground-table-body p-4 text-start max-md:text-xs max-sm:text-[10px]">
      <div className="flex items-center pr-3.5 max-lg:pr-0">
        <div className="h-10 w-10 max-lg:hidden">
          {/* Change to <Image /> from NextJS */}
          <img alt="profile picture" src={dataContent[0]?.toString()} />
        </div>
        <div className="flex max-w-xs flex-col max-md:max-w-36 max-sm:max-w-16">
          <p className="overflow-hidden text-ellipsis">{dataContent[1]}</p>
          <p className=" text-xs max-lg:hidden">{dataContent[2]}</p>
        </div>
      </div>
    </td>
  );

  return (
    <tr>
      {isProfile ? profileColumn : null}
      {dataContent.slice(isProfile ? 3 : 0).map((data, index) =>
        index == 0 && !isProfile ? (
          <td
            key={index}
            className="-border-b--clr-table-border sticky left-0 overflow-hidden text-ellipsis whitespace-nowrap border-b-1 border-r-1 border-solid bg-clr-blackground-table-body p-4 text-start max-lg:text-sm max-md:max-w-36 max-md:text-xs max-sm:max-w-16 max-sm:text-[10px]"
          >
            {data}
          </td>
        ) : (
          <td
            key={index}
            className="-border-b--clr-table-border whitespace-nowrap border-b-1 border-solid bg-clr-blackground-table-body p-4 px-3.5 text-start max-lg:text-sm max-md:text-xs max-sm:text-[10px]"
          >
            {data}
          </td>
        ),
      )}
      <td className="-border-b--clr-table-border whitespace-nowrap border-b-1 border-l-1 border-solid bg-clr-blackground-table-body p-4 px-3.5 text-start max-lg:text-sm max-md:px-4 max-md:text-xs max-sm:text-[10px] min-[320px]:sticky min-[320px]:right-0">
        <div
          className={
            onClickEdit && onClickDelete
              ? "flex gap-5"
              : "flex items-center justify-center"
          }
        >
          {onClickEdit && (
            <button onClick={onClickEdit} aria-label="Edit">
              <FiEdit />
            </button>
          )}
          {onClickOpen && (
            <button onClick={onClickOpen} aria-label="Open">
              <MdOpenInNew />
            </button>
          )}
          {onClickDelete && (
            <button onClick={onClickDelete} aria-label="Delete">
              <AiFillDelete />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TableData;
