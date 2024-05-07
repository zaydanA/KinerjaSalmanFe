"use client"
import React, { FormEvent, useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar} from "@nextui-org/react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import { useAuth } from "@/contexts";


const ProfileDropdown = () => {
    const [isDropdownActive,setIsDropdownActive] = useState(false);
    const { user, logout } = useAuth();

    const handleLogout = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await logout();
        } catch (error) {
            
        }
    };

    return(
        <div data-cy="profile-button" className="flex items-center gap-4 bg-white h-full justify-end">
                 <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <div className="flex items-center" onClick={()=>{setIsDropdownActive(!isDropdownActive)}}>
                            <Avatar
                                showFallback
                                isBordered
                                size="sm"
                                as="button"
                                className="transition-transform ring-[--kinerja-gold]"
                                />

                            <RiArrowDropDownLine className="h-full text-3xl text-[--kinerja-gold]"/>
                        </div>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem data-cy="profile-detail-button" key="profile" className="h-16 border-b-2 rounded-b-none">
                        <Link className="h-full w-full" href={`/profile`}>
                            <p className="font-semibold">{user?.full_name}</p>
                            <p className="font-light text-[12px] text-gray-500">{user?.email}</p>
                            <p className="font-light text-[12px] text-gray-500">{user?.position.title}</p>
                        </Link>
                    </DropdownItem>
                    <DropdownItem key="settings">
                        <div data-cy="account-setting-button" className="flex h-full items-center align-center gap-2">
                            <IoSettingsOutline/>
                            <Link href="/account">Account Settings</Link>
                        </div>
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                        <div data-cy="logout-button" className="flex h-full items-center align-center gap-2">
                            <GoSignOut />
                            <div>Log out</div>
                        </div>
                    </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
        </div>
    )
}

export default ProfileDropdown;