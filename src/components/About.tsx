"use client";

import React, { useContext, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getHoroscopeAndZodiac } from "@/lib/getHoroscopeAndZodiac";
import MyContext from "@/context/MyContext";

function About() {
  const { about, setAbout }: { about: any } = useContext(MyContext);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState(about?.data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "birthday") {
      const { horoscope, zodiac } = getHoroscopeAndZodiac(value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        horoscope,
        zodiac,
      }));
    }
  };

  const handleSave = () => {
    setAbout((prev) => ({
      ...prev,
      data: formData,
    }));
    setIsEdit(false);
  };

  return (
    <div className="w-full h-full rounded-[14px] bg-[#0E191F] p-4 py-6 px-6 mt-2">
      <div className="flex w-full justify-between">
        <h1 className="text-sm font-bold text-my-gradient-100 text-white">
          About
        </h1>
        {isEdit ? (
          <p
            className="text-xs font-medium gradient-text cursor-pointer"
            onClick={handleSave}>
            Save & Update
          </p>
        ) : (
          <CiEdit
            size={"1.2rem"}
            className="text-white cursor-pointer"
            onClick={() => setIsEdit(true)}
          />
        )}
      </div>

      {isEdit ? (
        <div>
          {/* Add image */}
          <div className="flex gap-4 items-center my-8">
            <div className="bg-[#FFFFFF14] w-[57px] h-[57px] rounded-[17px] flex justify-center items-center cursor-pointer">
              <GoPlus color="#CAB78E" size={"2rem"} />
            </div>
            <p className="text-white text-xs font-medium">Add image</p>
          </div>

          {/* Form */}
          {/* Display name */}
          <div className="flex items-center w-full justify-between mt-4">
            <div className="w-[30%]">
              <p className="text-[#FFFFFF54] text-[13px] font-medium">
                Display name:
              </p>
            </div>
            <div className="w-[70%]">
              <Input
                type="text"
                placeholder="Enter name"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                className="bg-[#FFFFFF0F] border-[#FFFFFF54] text-white h-[51px] rounded-[8px]"
              />
            </div>
          </div>

          {/* Gender */}
          <div className="flex items-center w-full justify-between my-4">
            <div className="w-[30%]">
              <p className="text-[#FFFFFF54] text-[13px] font-medium">Gender</p>
            </div>
            <div className="w-[70%]">
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }>
                <SelectTrigger className="bg-[#FFFFFF0F] border-[#FFFFFF54] text-[#fff] h-[51px] rounded-[8px]">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="bg-[#fff] border-[#FFFFFF54]">
                  <SelectItem
                    value="Male"
                    className="bg-[#FFFFFF0F] text-black">
                    Male
                  </SelectItem>
                  <SelectItem
                    value="Female"
                    className="bg-[#FFFFFF0F] text-black">
                    Female
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Birthday */}
          <div className="flex items-center w-full justify-between">
            <div className="w-[30%]">
              <p className="text-[#FFFFFF54] text-[13px] font-medium">
                Birthday:
              </p>
            </div>
            <div className="w-[70%]">
              <Input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                className="bg-[#FFFFFF0F] border-[#FFFFFF54] border h-[51px] rounded-[8px] text-white"
              />
            </div>
          </div>

          {/* Horoscope */}
          <div className="flex items-center w-full justify-between my-4">
            <div className="w-[30%]">
              <p className="text-[#FFFFFF54] text-[13px] font-medium">
                Horoscope:
              </p>
            </div>
            <div className="w-[70%]">
              <Input
                disabled
                type="text"
                name="horoscope"
                value={formData.horoscope}
                onChange={handleInputChange}
                placeholder="--"
                className="bg-[#FFFFFF0F] border-[#FFFFFF54] border h-[51px] rounded-[8px] text-white"
              />
            </div>
          </div>

          {/* Zodiac */}
          <div className="flex items-center w-full justify-between my-4">
            <div className="w-[30%]">
              <p className="text-[#FFFFFF54] text-[13px] font-medium">
                Zodiac:
              </p>
            </div>
            <div className="w-[70%]">
              <Input
                disabled
                type="text"
                name="zodiac"
                value={formData.zodiac}
                onChange={handleInputChange}
                placeholder="--"
                className="bg-[#FFFFFF0F] border-[#FFFFFF54] border h-[51px] rounded-[8px] text-white"
              />
            </div>
          </div>

          {/* Height */}
          <div className="flex items-center w-full justify-between my-4">
            <div className="w-[30%]">
              <p className="text-[#FFFFFF54] text-[13px] font-medium">
                Height:
              </p>
            </div>
            <div className="w-[70%]">
              <Input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                placeholder="Add height (cm)"
                className="bg-[#FFFFFF0F] border-[#FFFFFF54] border h-[51px] rounded-[8px] text-white"
              />
            </div>
          </div>

          {/* Weight */}
          <div className="flex items-center w-full justify-between my-4">
            <div className="w-[30%]">
              <p className="text-[#FFFFFF54] text-[13px] font-medium">
                Weight:
              </p>
            </div>
            <div className="w-[70%]">
              <Input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="Add weight (kg)"
                className="bg-[#FFFFFF0F] border-[#FFFFFF54] border h-[51px] rounded-[8px] text-white"
              />
            </div>
          </div>
        </div>
      ) : about?.data?.length === 0 ? (
        <p className="text-[#FFFFFF85] text-sm font-medium pt-8">
          Add in your your to help others know you better
        </p>
      ) : (
        <div>adaa</div>
      )}
    </div>
  );
}

export default About;
