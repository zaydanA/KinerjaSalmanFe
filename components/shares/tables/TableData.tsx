"use client";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
// import Image from "next/image";

// Normal : [Data1, ..., DataN]
// isProfile : [Image, Name, Subname, Data1, ..., DataN]
const TableData = ({
  dataContent,
  onClickAction,
  isProfile,
}: {
  dataContent: string[];
  onClickAction?: () => void;
  isProfile: boolean;
}) => {
  const profileColumn = (
    <td className="sticky left-0 flex">
      <div className="flex items-center pr-3.5">
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
      {profileColumn}
      {dataContent.slice(isProfile ? 3 : 0).map((data, index) =>
        index == 0 && !isProfile ? (
          <td key={index} className="sticky left-0">
            {data}
          </td>
        ) : (
          <td key={index} className=" px-3.5">
            {data}
          </td>
        )
      )}
      {onClickAction ? (
        <td className="sticky right-0 text-center px-5">
          <button>
            <BsThreeDots />
          </button>
        </td>
      ) : (
        ""
      )}
    </tr>
  );
};

export default TableData;
