"use client"
import React, { useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { FaUserTie } from "react-icons/fa6";
import { apiBase } from "@/api";
import { MdEmail } from "react-icons/md";
const OrganizationStructure = () => {

    const [data,setData] = useState();

    useEffect(()=>{
        async function getEmployeeHierarchy() {
            const response = await apiBase().employee().getEmployeeHierarchy()
            setData(response.data)
        }
        getEmployeeHierarchy()
    },[])
    return(
    <>        
        <div className="flex flex-row justify-between items-center px-10">
            <div className="w-fit">
                <h1 className=" text-[--kinerja-gold] font-bold text-3xl font-mono">
                    Salman Hierarchy
                </h1>
                <div className="h-[6px] w-full bg-[--kinerja-gold] rounded-xl">
                </div>
            </div>
        </div>
        {
            data ?
            <Tree
                lineWidth={"1px"}
                lineColor={"#b29f7a"}
                lineBorderRadius={"10px"}
                label={
                    <Card data={data}></Card>
                }
            >
                {
                    renderTreeNode(data.child)
                }
            </Tree>:<div></div>
        }
    </>
        )

};

const renderTreeNode = (data: any[]) => {
    if (!data) {
        return null;
    }

    return data.map((child: { child: any; }) => (
        <TreeNode label={<Card data={child}></Card>}>
            {renderTreeNode(child.child)}
        </TreeNode>
    ));
};



const Card = (props:any)=>{
    return(
        <div className="inline-block bg-white border-1 border-[--kinerja-gold] text-white rounded-lg shadow-lg font-mono">
            <div className="text-lg gap-2 flex text-gray-800 px-5 pt-1 items-center justify-center">
                <FaUserTie className="text-md"/>
                <p>{props.data.name}</p>
            </div>
            <div className="text-[10px] gap-1 font-thin flex text-gray-500 px-5 pt-1 items-center justify-center">
                <MdEmail className="text-[12px]"/>
                <p>{props.data.email}</p>
            </div>
            <div className="w-full bg-[--kinerja-gold] rounded-b-md text-sm px-1">
                {props.data.position} - {props.data.departement}
            </div>
        </div>
        )
}

export default OrganizationStructure;
