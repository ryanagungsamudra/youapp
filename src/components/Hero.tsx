import MyContext from "@/context/MyContext";
import { MyContextType } from "@/context/types";
import { calculateAge } from "@/lib/getHoroscopeAndZodiac";
import Image from "next/image";
import React, { useContext } from "react";

import {
  GiAries,
  GiTaurus,
  GiGemini,
  GiCancer,
  GiLeo,
  GiVirgo,
  GiLibra,
  GiScorpio,
  GiSagittarius,
  GiCapricorn,
  GiAquarius,
  GiPisces,
} from "react-icons/gi";

const horoscopeIcons: { [key: string]: React.ElementType } = {
  Aries: GiAries,
  Taurus: GiTaurus,
  Gemini: GiGemini,
  Cancer: GiCancer,
  Leo: GiLeo,
  Virgo: GiVirgo,
  Libra: GiLibra,
  Scorpio: GiScorpio,
  Sagittarius: GiSagittarius,
  Capricorn: GiCapricorn,
  Aquarius: GiAquarius,
  Pisces: GiPisces,
};

interface HoroscopeIconProps {
  sign: any;
}

const HoroscopeIcon: React.FC<HoroscopeIconProps> = ({ sign }) => {
  const IconComponent = horoscopeIcons[sign];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className="text-white" />;
};

function Hero() {
  const { users, about } = useContext(MyContext) as MyContextType;

  const gender = about?.data?.gender;
  const horoscope = about?.data?.horoscope;
  const zodiac = about?.data?.zodiac;

  return (
    <div className="w-full h-[200px] bg-[#162329] rounded-2xl relative">
      {about?.picture && (
        <Image
          src={about.picture}
          alt="."
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-2xl"
        />
      )}
      <div className={`absolute left-4 bottom-3`}>
        <h1 className="text-white font-bold text-base ">
          @
          {about?.data?.displayName
            ? about?.data?.displayName
            : users?.username}
          , {about?.data?.birthday ? calculateAge(about?.data?.birthday) : null}
        </h1>

        <p className="text-[13px] font-medium text-white mt-1">
          {gender ? about?.data?.gender : null}
        </p>

        <div className="flex gap-2 mt-4">
          {horoscope && (
            <div className="flex items-center gap-2 rounded-[100px] h-full bg-[#353A35] p-2 px-4">
              <HoroscopeIcon sign={horoscope} />
              <p className="text-white text-sm font-semibold">{horoscope}</p>
            </div>
          )}

          {zodiac && (
            <div className="flex items-center gap-2 rounded-[100px] h-full bg-[#353A35] p-2 px-4">
              <HoroscopeIcon sign={horoscope} />
              <p className="text-white text-sm font-semibold">{zodiac}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
