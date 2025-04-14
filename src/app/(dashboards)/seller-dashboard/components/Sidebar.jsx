"use client";
import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useAuthStore } from "../../../../../store/authStore";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "@heroicons/react/24/outline";

const Sidebar = ({ onClose }) => {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className="bg-gray-800 text-white w-64 h-full flex flex-col z-50 fixed md:relative">
      {onClose && (
        <div className="flex justify-end p-4 md:hidden">
          <button
            onClick={onClose}
            className="text-white focus:outline-none"
            aria-label="Close Menu"
          >
            <X size={24} />
          </button>
        </div>
      )}

      <div className="p-4 flex flex-col items-center">
        <img
          src={user?.image || "/profile.png"}
          alt="User"
          className="w-20 h-20 rounded-full mb-3 object-cover border-2 border-white"
        />
        <h2 className="text-xl   font-semibold text-center">{user?.name}</h2>
      </div>

      <nav className="flex-1 p-4 space-y-2 flex flex-col items-center overflow-y-auto">
        <Link href="/seller-dashboard" onClick={onClose}>
          <Button
            variant="ghost"
            className="w-full justify-start cursor-pointer"
          >
            Manage Products
          </Button>
        </Link>
        <Link href="/seller-dashboard/upload-product" onClick={onClose}>
          <Button
            variant="ghost"
            className="w-full justify-start cursor-pointer"
          >
            Upload Products
          </Button>
        </Link>
        <div className="mt-4">
          <Link href="/">
            <Button className="flex items-center gap-2 bg-gray-600 cursor-pointer">
              <HomeIcon className="h-5 w-5" />
              Return Home
            </Button>
          </Link>
        </div>
        {/* <Link href="/user-dashboard/wishlist" onClick={onClose}>
          <Button
            variant="ghost"
            className="w-full justify-start cursor-pointer"
          >
            Wishlist
          </Button>
        </Link> */}

        <div className="p-4 mt-20">
          <Button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-500 cursor-pointer"
          >
            Log Out
          </Button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
