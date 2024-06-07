"use client";

import React, { useContext, useEffect, useState } from "react";
import MyContext from "@/context/MyContext";
import { redirect, useRouter } from "next/navigation";
import BackNavbar from "@/components/BackNavbar";
import About from "@/components/About";
import Interest from "@/components/Interest";
import Hero from "@/components/Hero";
import { MyContextType } from "@/context/types";

function Page() {
  const { users } = useContext(MyContext) as MyContextType;

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
