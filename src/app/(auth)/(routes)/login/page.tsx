"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import Link from "next/link";
import MyContext from "@/context/MyContext";
import { redirect, useRouter } from "next/navigation";
import BackNavbar from "@/components/BackNavbar";
import { LoadingScreen } from "@/components/LoadingScreen";
import { MyContextType } from "@/context/types";

function LoginPage() {
  const { users, setUsers } = useContext(MyContext) as MyContextType;
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      email: emailOrUsername.includes("@") ? emailOrUsername : "",
      username: emailOrUsername.includes("@") ? "" : emailOrUsername,
    }));
  }, [emailOrUsername]);

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    setTimeout(() => {
      try {
        if (
          (form.email === users.email || form.username === users.username) &&
          form.password === users.password
        ) {
          setUsers((prev) => ({
            ...prev,
            isLogin: true,
          }));
        } else {
          console.log("Login failed");
        }
      } catch (error) {
        console.error("An error occurred during login", error);
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  if (users.isLogin) {
    redirect("/");
  }

  return (
    <div>
      <BackNavbar displayName={false} displayButton={false} />
      <LoadingScreen status={loading} />

      {/* Form start */}
      <div className="w-full h-[80vh] flex items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-wrap items-center mx-auto px-4">
          <h1 className="text-2xl font-bold text-white mt-[4rem] ml-4">
            Login
          </h1>

          {/* Email */}
          <div className="w-full mt-8">
            <Input
              type="email"
              placeholder="Enter Username/Email"
              className="bg-[#FFFFFF0F] border-[#FFFFFF0F] text-white h-[51px]"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="w-full my-4 relative">
            <Input
              type={visible ? "text" : "password"}
              placeholder="Enter Password"
              className="bg-[#FFFFFF0F] border-[#FFFFFF0F] text-white h-[51px]"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              className="absolute right-4 top-4 focus:outline-none">
              {visible ? (
                <FiEye size={21} color="#CAB78E" />
              ) : (
                <FiEyeOff size={21} color="#CAB78E" />
              )}
            </button>
          </div>

          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-primary-gradient w-full h-[48px] mt-4">
            Login
          </Button>

          <div className="w-full text-white text-base font-medium text-center mt-16">
            No account?{" "}
            <Link
              href={"/register"}
              className="underline gradient-text cursor-pointer">
              Register here
            </Link>
          </div>
        </form>
      </div>
      {/* Form end */}
    </div>
  );
}

export default LoginPage;
