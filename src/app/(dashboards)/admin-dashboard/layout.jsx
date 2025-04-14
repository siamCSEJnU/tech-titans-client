"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";

export default function AdminDashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCloseSidebar = () => setMobileOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseSidebar}
          />
          <Sidebar onClose={handleCloseSidebar} />
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        {/* Mobile Toggle Button */}
        <div className="md:hidden mb-4">
          <Button
            onClick={() => setMobileOpen(true)}
            className="bg-gray-800 text-white"
          >
            Open Menu
          </Button>
        </div>

        {children}
      </div>
    </div>
  );
}
