"use client";

import BackNavbar from "@/components/BackNavbar";
import MyContext from "@/context/MyContext";
import React, { useContext, useState } from "react";

function Page() {
  const { interest }: { interest: any } = useContext(MyContext);

  const [chips, setChips] = useState(interest?.data);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setChips([...chips, inputValue.trim()]);
      setInputValue("");
    } else if (e.key === "Backspace" && inputValue === "" && chips.length > 0) {
      setChips(chips.slice(0, -1));
    }
  };

  const handleDeleteChip = (chipToDelete) => {
    setChips(chips.filter((chip) => chip !== chipToDelete));
  };

  return (
    <div className="w-full">
      <BackNavbar displayName={false} displayButton={true} data={chips} />

      <div className="w-full flex flex-wrap mt-[6rem] px-[0.8rem] gap-3">
        <h2 className="w-full gradient-text text-sm font-bold px-[1rem]">
          Tell everyone about yourself
        </h2>
        <h1 className="w-full text-white text-xl font-bold px-[1rem]">
          What interest you?
        </h1>
      </div>

      <div className="px-6">
        <div className="flex flex-wrap w-full h-full bg-[#D9D9D90F] border border-[#D9D9D90F] mt-8 rounded-[10px] p-1 px-2">
          {chips.map((chip, index) => (
            <div
              key={index}
              className="flex items-center m-1 px-2 py-1 bg-[#FFFFFF1A] text-white rounded">
              <span>{chip}</span>
              <button
                className="ml-2 text-white"
                onClick={() => handleDeleteChip(chip)}>
                &times;
              </button>
            </div>
          ))}
          <input
            className="flex-grow p-2 m-1 bg-transparent text-white rounded outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type something and press enter"
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
