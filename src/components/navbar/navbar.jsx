"use client";

import React, { useEffect, useState } from "react";

import TopNav from "./TopNav";
import CategoryLinks from "../category/category-links";
import { useAuthStore } from "../../../store/authStore";
import MobileMenu from "./MobileMenu";
import { useCategoryStore } from "../../../store/category-store";
import { useCartStore } from "../../../store/cart-store";
import { usePathname, useRouter } from "next/navigation";
import { useWishlistStore } from "../../../store/wishlist-store";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { setAvatar, logout } = useAuthStore();
  const { groupedCategories, fetchGroupCategories } = useCategoryStore();
  const { clearCart } = useCartStore();
  const { resetWishlist } = useWishlistStore();

  const handleLogout = () => {
    logout();
    setAvatar(null);
    // clearCart();
    resetWishlist();
    router.push("/");
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
    fetchGroupCategories();
  }, [fetchGroupCategories]);

  // console.log(avatar);
  if (!pathname.includes("dashboard")) {
    return (
      <nav className="sticky top-0 z-50 bg-gray-100 shadow">
        {/* Top Row */}
        <TopNav
          mobileOpen={mobileOpen}
          handleLogout={handleLogout}
          setMobileOpen={setMobileOpen}
        ></TopNav>

        {/* Second Row: Nav Links */}
        <CategoryLinks groupedCategories={groupedCategories} />

        {/* Mobile Menu */}
        {mobileOpen && (
          <MobileMenu groupedCategories={groupedCategories}></MobileMenu>
        )}
      </nav>
    );
  } else {
    return <></>;
  }
};

export default Navbar;
