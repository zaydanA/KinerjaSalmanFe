"use client";
import React, {useState} from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";


const TableData = ({
  dataContent,
  onClickEdit, 
  onClickDelete,
  isProfile,
}: 

{
  dataContent: string[];
  onClickEdit?: () => void;
  onClickDelete?: () => void;
  isProfile: boolean;
}) => 

{
  const profileColumn = (
    <td className="sticky left-0 bg-white flex">
      <div className="flex items-center">
        <div className="w-10 h-10">
          {/* Change to <Image /> from NextJS */}
          <img alt="profile picture" src={dataContent[0]} />
        </div>
        <div className="flex flex-col">
          <p>{dataContent[1]}</p>
          <p className=" text-xs">{dataContent[2]}</p>
        </div>
      </div>
    </td>
  );

  return (
    <tr>
      {isProfile ? profileColumn : null}
      {dataContent.slice(isProfile ? 3 : 0).map((data, index) =>
        index == 0 && !isProfile ? (
          <td key={index} className="sticky left-0 bg-white">
            {data}
          </td>
        ) : (
          <td key={index} className=" px-3.5">
            {data}
          </td>
        )
      )}
      {onClickEdit && onClickDelete ? (
      <td className="sticky right-0 bg-white text-center flex justify-center items-center gap-2">
        <button onClick={onClickEdit} aria-label="Edit">
          <FiEdit />
        </button>
        <button onClick={onClickDelete} aria-label="Delete">
          <AiFillDelete />
        </button>
      </td>
      ) : (
        ''
      )}
    </tr>
  );
};

export default TableData;
