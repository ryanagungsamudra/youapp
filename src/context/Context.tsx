"use client";

import React from "react";
import useLocalStorageState from "@/lib/useLocalStorageState";
import MyContext from "./MyContext";

const Context = ({ children }) => {
  // DATA
  const [users, setUsers] = useLocalStorageState("usersData", {
    email: "",
    username: "",
    password: "",
    isLogin: false,
  });

  const [interest, setInterest] = useLocalStorageState("userInterest", {
    data: [],
  });

  const [about, setAbout] = useLocalStorageState("userAbout", {
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
