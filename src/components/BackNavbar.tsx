"use client";

import MyContext from "@/context/MyContext";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MyContextType } from "@/context/types";

function BackNavbar({
  displayName,
  displayButton,
  data,
}: {
  displayName: boolean;
  displayButton: boolean;
  data?: any;
}) {
  const router = useRouter();
  const { users, setUsers, setInterest } = useContext(
    MyContext
  ) as MyContextType;

  const handleSave = () => {
    setInterest((prev: any) => ({
      ...prev,
      data: data,
    }));
    router.push("/");
  };

  const handleLogout = () => {
    setUsers((prev: any) => ({
      ...prev,
      isLogin: false,
    }));
  };

  return (
    <div className="flex w-full justify-between items-center mt-8">
      <button
        className="flex gap-1 h-8 items-center"
        onClick={() => router.back()}>
        <MdOutlineArrowBackIosNew size={"1.5rem"} className="text-white" />
        <h1 className="text-sm font-bold text-white">Back</h1>
      </button>

      {displayButton ? (
        <p
          onClick={handleSave}
          className="gradient-text-secondary text-sm font-semibold pr-2 cursor-pointer">
          Save
        </p>
      ) : displayName ? (
        <>
          <div className="text-sm font-semibold text-white">
            @{users.username}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <BsThreeDots size={"1.5rem"} className="text-white" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20 absolute -right-4 top-0 bg-[#FFFFFF0F] border-[#FFFFFF0F] text-white">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}>
                <MdLogout className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : null}
    </div>
  );
}

export default BackNavbar;
