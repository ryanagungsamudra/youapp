"use client";

import React, { ReactNode } from "react";
import useLocalStorageState from "@/lib/useLocalStorageState";
import MyContext from "./MyContext";
import { User, Interest, About } from "@/context/types";

interface ContextProps {
  children: ReactNode;
}

const Context = ({ children }: ContextProps) => {
  const [users, setUsers] = useLocalStorageState<User>("usersData", {
    email: "",
    username: "",
    password: "",
    isLogin: false,
  });

  const [interest, setInterest] = useLocalStorageState<Interest>(
    "userInterest",
    {
      data: [],
    }
  );

  const [about, setAbout] = useLocalStorageState<About>("userAbout", {
    picture: "",
    data: [],
  });

  return (
    <MyContext.Provider
      value={{
        users,
        setUsers,
        interest,
        setInterest,
        about,
        setAbout,
      }}>
      {children}
    </MyContext.Provider>
  );
};

export default Context;
