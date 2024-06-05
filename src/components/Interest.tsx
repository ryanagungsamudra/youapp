"use client";

import MyContext from "@/context/MyContext";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { CiEdit } from "react-icons/ci";

function Interest() {
  const router = useRouter();

  const { interest }: { interest: any } = useContext(MyContext);

  return (
    <div className="w-full h-full rounded-[14px] bg-[#0E191F] p-4 py-6 px-6">
      <div className="flex w-full justify-between">
        <h1 className="text-white text-sm font-bold">Interest</h1>
        <CiEdit
          size={"1.2rem"}
          className="text-white cursor-pointer"
          onClick={() => router.push("/interest")}
        />
      </div>

      {interest?.data?.length === 0 ? (
        <p className="text-[#FFFFFF85] text-sm font-medium pt-8">
          Add in your interest to find a better match
        </p>
      ) : (
        <div className="flex flex-wrap gap-3 mt-8">
          {interest?.data?.map((item) => {
            return (
              <>
                <div className="h-full p-2 px-5 bg-[#FFFFFF0F] rounded-[100px]">
                  <p className="text-white">{item}</p>
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Interest;
