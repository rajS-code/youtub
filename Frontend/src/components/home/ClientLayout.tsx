"use client";

import Header from "@/components/navigation/Header";
import Sidebar from "@/components/navigation/Sidebar";
import React, { useState } from "react";
import { Toaster } from "@/components/ui/sonner";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleSideBar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Toaster/>
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} />
        {children}
      </div>
    </div>
  );
};

export default ClientLayout;
