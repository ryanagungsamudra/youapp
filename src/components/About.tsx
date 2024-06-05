"use client";

import React, { useContext, useEffect, useState } from "react";
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
import {
  getHoroscopeAndZodiac,
  formatBirthday,
} from "@/lib/getHoroscopeAndZodiac";
import MyContext from "@/context/MyContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { LoadingScreen } from "./LoadingScreen";

function About() {
  const [loading, setLoading] = useState(false);

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
    uploadFirebase();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          imagePreview: upload.target.result, // Data URL for preview
          imageFile: file, // Actual file for upload
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  // Handle upload image
  const uploadFirebase = async () => {
    setLoading(true);

    if (formData?.imageFile) {
      const fileName = formData.imageFile.name;
      const imageRef = ref(storage, `/youapp/${fileName}`);
      const task = uploadBytesResumable(imageRef, formData.imageFile);

      try {
        await task;
        const downloadURL = await getDownloadURL(imageRef);
        console.log("File uploaded successfully. Download URL:", downloadURL);

        setAbout((prev) => ({
          ...prev,
          data: formData,
          picture: downloadURL,
        }));
        setFormData((prev) => ({
          ...prev,
          imagePreview: "",
        }));

        setLoading(false);
        setIsEdit(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      setAbout((prev) => ({
        ...prev,
        picture: about.picture,
        data: formData,
      }));
      setFormData((prev) => ({
        ...prev,
        imagePreview: "",
      }));

      setLoading(false);
      setIsEdit(false);
    }
  };

  return (
    <div className="w-full h-full rounded-[14px] bg-[#0E191F] p-4 py-6 px-6 mt-2">
      <LoadingScreen status={loading} />

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
            {formData.imagePreview ? (
              <div>
                <img
                  src={formData.imagePreview}
                  alt="Selected"
                  className="w-[57px] h-[57px] rounded-[17px] cursor-pointer"
                  onClick={triggerFileInput}
                />
              </div>
            ) : (
              <div
                className="bg-[#FFFFFF14] w-[57px] h-[57px] rounded-[17px] flex justify-center items-center cursor-pointer"
                onClick={triggerFileInput}>
                <GoPlus color="#CAB78E" size={"2rem"} />
              </div>
            )}
            <p className="text-white text-xs font-medium">Add image</p>
          </div>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />

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
        <div className="mt-6">
          <div className="flex gap-2 mb-2">
            <p className="text-[#FFFFFF54] text-[13px] font-medium">
              Birthday:
            </p>
            <p className="text-white text-[13px] font-medium">
              {formatBirthday(about?.data?.birthday)}
            </p>
          </div>

          <div className="flex gap-2 mb-2">
            <p className="text-[#FFFFFF54] text-[13px] font-medium">
              Horoscope:
            </p>
            <p className="text-white text-[13px] font-medium">
              {about?.data?.horoscope}
            </p>
          </div>

          <div className="flex gap-2 mb-2">
            <p className="text-[#FFFFFF54] text-[13px] font-medium">Zodiac:</p>
            <p className="text-white text-[13px] font-medium">
              {about?.data?.zodiac}
            </p>
          </div>

          <div className="flex gap-2 mb-2">
            <p className="text-[#FFFFFF54] text-[13px] font-medium">Height:</p>
            <p className="text-white text-[13px] font-medium">
              {about?.data?.height} cm
            </p>
          </div>

          <div className="flex gap-2 mb-2">
            <p className="text-[#FFFFFF54] text-[13px] font-medium">Weight:</p>
            <p className="text-white text-[13px] font-medium">
              {about?.data?.weight} kg
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default About;
