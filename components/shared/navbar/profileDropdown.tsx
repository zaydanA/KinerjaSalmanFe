"use client"
import React, { useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const ProfileDropdown = (props:any) => {
    const [isDropdownActive,setIsDropdownActive] = useState(false);
    return(
        <div className="flex items-center gap-4 bg-white">
                 <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <div className="flex items-center" onClick={()=>{setIsDropdownActive(!isDropdownActive)}}>
                            <Avatar
                                isBordered
                                size="sm"
                                as="button"
                                className="transition-transform ring-[--kinerja-gold]"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                />
                            {!isDropdownActive? <RiArrowDropDownLine className="h-full text-3xl text-[--kinerja-gold]"/>:<RiArrowDropUpLine className="h-full text-3xl text-[--kinerja-gold]"/>}
                        </div>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2 border-b-2 rounded-none ">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">zoey@example.com</p>
                    </DropdownItem>
                    <DropdownItem key="settings">
                        My Settings
                    </DropdownItem>
                    <DropdownItem key="team_settings">Team Settings</DropdownItem>
                    <DropdownItem key="analytics">
                        Analytics
                    </DropdownItem>
                    <DropdownItem key="system">System</DropdownItem>
                    <DropdownItem key="configurations">Configurations</DropdownItem>
                    <DropdownItem key="help_and_feedback">
                        Help & Feedback
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger">
                        Log Out
                    </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
        </div>
    )
}

export default ProfileDropdown;