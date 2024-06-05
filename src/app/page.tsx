"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import MyContext from "@/context/MyContext";
import { redirect, useRouter } from "next/navigation";
import BackNavbar from "@/components/BackNavbar";
import About from "@/components/About";
import Interest from "@/components/Interest";
import Hero from "@/components/Hero";

interface User {
  email: string;
  username: string;
  password: string;
  isLogin: boolean;
}

function Page() {
  const { users }: { users: User } = useContext(MyContext);

  if (!users.isLogin) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen w-full flex container-primary">
      <div className="w-full">
        <BackNavbar displayName={true} displayButton={false} />

        <div className="w-full flex flex-wrap mt-8 gap-6">
          {/* Picture section */}
          <Hero />
          {/* About section */}
          <About />
          {/* Interest section */}
          <Interest />
        </div>
      </div>
    </div>
  );
}

export default Page;
