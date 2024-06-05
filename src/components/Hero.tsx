import MyContext from "@/context/MyContext";
import React, { useContext } from "react";

interface User {
  email: string;
  username: string;
  password: string;
  isLogin: boolean;
}

function Hero() {
  const { users }: { users: User } = useContext(MyContext);

  return (
    <div className="w-full h-[190px] bg-[#162329] rounded-2xl relative">
      <h1 className="text-white font-bold text-base absolute left-4 bottom-4">
        @{users.username},
      </h1>
    </div>
  );
}

export default Hero;
