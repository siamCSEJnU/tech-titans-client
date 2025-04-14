"use client";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../../../store/cart-store";
import { useAuthStore } from "../../../store/authStore";
import { useWishlistStore } from "../../../store/wishlist-store";
import Swal from "sweetalert2";

const TopNav = ({ mobileOpen, handleLogout, setMobileOpen }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { items: wishlistItems, fetchWishlist } = useWishlistStore();
  const wishlistCount = wishlistItems.length;

  const { token, avatar, setIntendedPath, user } = useAuthStore();
  const isLoggedIn = !!token;
  const isRegularUser = user?.type === "user";

  useEffect(() => {
    if (user?.email) {
      fetchWishlist(user.email);
    }
  }, [user?.email]);

  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      const targetPath =
        pathname === "/"
          ? `/products?search=${encodeURIComponent(searchTerm)}`
          : `${pathname}?search=${encodeURIComponent(searchTerm)}`;

      router.push(targetPath);
      setSearchTerm("");
    }
  };

  const handleCheckoutClick = (e) => {
    if (!isRegularUser) {
      e.preventDefault();
      return;
    }

    if (!user?.mobile_number) {
      e.preventDefault();
      Swal.fire({
        icon: "warning",
        title: "Profile Update Required",
        html: `
          <div>
            <p>You need to add your mobile number before checkout.</p>
            <p>Would you like to update your profile now?</p>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: "Update Profile",
        cancelButtonText: "Later",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/user-dashboard/update-profile");
          setIntendedPath("/checkout");
        }
      });
    }
  };

  return (
    <div className="w-4/5 mx-auto flex items-center justify-between px-4 py-3">
      <Link
        href="/"
        className="hover:text-gray-600 text-2xl tracking-wide font-semibold"
      >
        Tech Titans
      </Link>

      {/* Search */}
      <div className=" w-2/3 md:w-1/2 lg:w-1/3">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="w-full border px-3 py-2 rounded-md bg-white focus:ring-2 focus:ring-black outline-none"
          />
        </form>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-4">
          {/* Wishlist icon visible for all users, but disabled unless regular user */}
          <div className="relative group">
            {isRegularUser ? (
              <Link href="/user-dashboard/wishlist">
                <HeartIcon className="w-6 h-6 hover:text-pink-500 transition" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            ) : (
              <div className="cursor-not-allowed ">
                <HeartIcon className="w-6 h-6" />
              </div>
            )}
          </div>

          {/* Cart icon visible for all users, but disabled unless regular user */}
          <div className="relative group">
            {isRegularUser ? (
              <Link
                href={user?.mobile_number ? "/checkout" : "#"}
                className="relative"
                onClick={handleCheckoutClick}
              >
                <ShoppingCartIcon className="w-6 h-6 hover:text-gray-600 transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            ) : (
              <div className="cursor-not-allowed ">
                <ShoppingCartIcon className="w-6 h-6" />
              </div>
            )}
          </div>

          {/* Auth */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <Link
                href={
                  user?.type === "admin"
                    ? "/admin-dashboard"
                    : user?.type === "seller"
                    ? "/seller-dashboard"
                    : "/user-dashboard"
                }
              >
                <Image
                  src={avatar || "/profile.png"}
                  width={28}
                  height={28}
                  alt="Profile"
                  className="rounded-full border-2 border-gray-300 cursor-pointer"
                />
              </Link>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 cursor-pointer"
              >
                LogOut
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-700 hover:text-gray-600 font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-gray-700 hover:text-gray-600 font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          className="md:hidden cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <XMarkIcon className="h-6 w-6 " />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default TopNav;
