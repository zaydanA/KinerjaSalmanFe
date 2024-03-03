"use client"
import React, { useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineCorporateFare } from "react-icons/md";
import { GoSignOut } from "react-icons/go";

const ProfileDropdown = (props:any) => {
    const [isDropdownActive,setIsDropdownActive] = useState(false);
    return(
        <div className="flex items-center gap-4 bg-white h-full justify-end">
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
                            <RiArrowDropDownLine className="h-full text-3xl text-[--kinerja-gold]"/>
                        </div>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-16 border-b-2 rounded-b-none">
                        <Link className="h-full w-full" href="/profile">
                            <p className="font-semibold">Bagas Jawir wir wir</p>
                            <p className="font-light text-[12px] text-gray-500">13521081@std.stei.itb.ac.id</p>
                            <p className="font-light text-[12px] text-gray-500">Manager</p>
                        </Link>
                    </DropdownItem>
                    <DropdownItem key="settings">
                        <div className="flex h-full items-center align-center gap-2">
                            <IoSettingsOutline/>
                            <Link href="/account">Account Settings</Link>
                        </div>
                    </DropdownItem>
                    <DropdownItem key="team_settings">
                        <div className="flex h-full items-center align-center gap-2">
                            <MdOutlineCorporateFare />
                            <Link href="/company">Company Settings</Link>
                        </div>
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger">
                        <div className="flex h-full items-center align-center gap-2">
                            <GoSignOut />
                            <Link href="/">Log out</Link>
                        </div>
                    </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
        </div>
    )
}

export default ProfileDropdown;