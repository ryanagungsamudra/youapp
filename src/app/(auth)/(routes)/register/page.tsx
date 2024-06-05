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

interface User {
  email: string;
  username: string;
  password: string;
  isLogin: boolean;
}

function RegisterPage() {
  const { users, setUsers }: { users: User } = useContext(MyContext);
  const router = useRouter();

  const [visible, setVisible] = useState({
    password: false,
    confirmPassword: false,
  });
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
    passwordError: "",
  });
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (password.password === password.confirmPassword) {
      setForm({ ...form, password: password.password });
      setPassword({ ...password, passwordError: "" });
    } else {
      setForm({ ...form, password: "" });
      setPassword({ ...password, passwordError: "Password should be same!" });
    }
  }, [password.password, password.confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email && form.username && form.password) {
      setUsers((prev) => ({
        ...prev,
        email: form.email,
        username: form.username,
        password: form.password,
        isLogin: false,
      }));

      router.push("/login");
    }
  };

  if (users.isLogin) {
    redirect("/");
  }

  return (
    <div>
      <BackNavbar displayName={false} displayButton={false} />

      {/* Form start */}
      <div className="w-full h-[80vh] flex items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-wrap items-center mx-auto px-4">
          <h1 className="text-2xl font-bold text-white mt-[4rem] ml-4">
            Register
          </h1>

          {/* Email */}
          <div className="w-full mt-8">
            <Input
              type="email"
              placeholder="Enter Email"
              className="bg-[#FFFFFF0F] border-[#FFFFFF0F] text-white h-[51px]"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Username */}
          <div className="w-full mt-4">
            <Input
              type="text"
              placeholder="Enter Username"
              className="bg-[#FFFFFF0F] border-[#FFFFFF0F] text-white h-[51px]"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="w-full mt-4 relative">
            <Input
              type={visible.password ? "text" : "password"}
              placeholder="Create Password"
              className="bg-[#FFFFFF0F] border-[#FFFFFF0F] text-white h-[51px]"
              value={password.password}
              onChange={(e) =>
                setPassword({ ...password, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() =>
                setVisible({ ...visible, password: !visible.password })
              }
              className="absolute right-4 top-4 focus:outline-none">
              {visible.password ? (
                <FiEye size={21} color="#CAB78E" />
              ) : (
                <FiEyeOff size={21} color="#CAB78E" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="w-full my-4 relative">
            <Input
              type={visible.confirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="bg-[#FFFFFF0F] border-[#FFFFFF0F] text-white h-[51px]"
              value={password.confirmPassword}
              onChange={(e) =>
                setPassword({ ...password, confirmPassword: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() =>
                setVisible({
                  ...visible,
                  confirmPassword: !visible.confirmPassword,
                })
              }
              className="absolute right-4 top-4 focus:outline-none">
              {visible.confirmPassword ? (
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
            Register
          </Button>

          <div className="w-full text-white text-base font-medium text-center mt-16">
            Have an account?{" "}
            <Link
              href={"/login"}
              className="underline gradient-text cursor-pointer">
              Login here
            </Link>
          </div>
        </form>
      </div>
      {/* Form end */}
    </div>
  );
}

export default RegisterPage;
