"use client";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCartStore } from "../../store/cart-store";
import { Button } from "./ui/button";
import Image from "next/image";
import { fetchAllCategories } from "@/lib/api";
import { slugify } from "@/lib/slugify";
import { usePathname, useRouter } from "next/navigation";
import CategoryLinks from "./category-links";
import { useAuthStore } from "../../store/authStore";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const { token, logout, avatar, setAvatar } = useAuthStore();
  const isLoggedIn = !!token;

  const handleLogout = () => {
    logout();
    setAvatar(null);
    router.push("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchAllCategories();
      setCategories(data?.filter((cat) => !cat?.parent_id));
    };
    getCategories();
    return () => setCategories([]);
  }, []);

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
  // console.log(avatar);

  return (
    <nav className="sticky top-0 z-50 bg-gray-100 shadow">
      {/* Top Row */}
      <div className="w-4/5 mx-auto flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="hover:text-blue-600 text-2xl tracking-wide font-semibold"
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
            <Link href="/wishlist" className="relative">
              <HeartIcon className="w-6 h-6 hover:text-pink-500 transition" />
            </Link>
            <Link href="/checkout" className="relative">
              <ShoppingCartIcon className="w-6 h-6 hover:text-blue-600 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            {isLoggedIn ? (
              <>
                <div className="flex items-center space-x-2">
                  <Image
                    src={avatar || "/profile.png"}
                    width={28}
                    height={28}
                    alt="Profile"
                    className="rounded-full border-2 border-gray-300 cursor-pointer"
                  />
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600 cursor-pointer"
                  >
                    LogOut
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="text-gray-700 hover:text-blue-600 font-medium"
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

      {/* Second Row: Nav Links */}
      <CategoryLinks categories={categories} />

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <ul className="flex flex-col p-4 space-y-2 text-sm font-medium">
            <li>
              <Link href="/" className="block hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="block hover:text-blue-600">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="block hover:text-blue-600">
                Checkout
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="block hover:text-pink-500">
                Wishlist
              </Link>
            </li>
            <li className="pt-2 font-semibold text-gray-600">Categories</li>
            {categories.map((cat) => (
              <li key={cat?.id}>
                <Link
                  href={`/category/${slugify(cat?.name)}`}
                  className="block hover:text-blue-600"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
