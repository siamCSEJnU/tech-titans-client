"use client";
import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Link from "next/link";

import { useCartStore } from "../../../../../store/cart-store";
import { useWishlistStore } from "../../../../../store/wishlist-store";
import { useAuthStore } from "../../../../../store/authStore";
import WishListTable from "@/components/dashboard/WishListTable";

const WishList = () => {
  const { items, removeFromWishlist, fetchWishlist, loading } =
    useWishlistStore();
  const { addItem } = useCartStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.email) {
      fetchWishlist(user.email);
    }
  }, [user?.email, fetchWishlist]);

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.image,
      quantity: 1,
    });
  };

  const handleRemoveFromWishlist = (productId) => {
    if (user?.email) {
      removeFromWishlist(user.email, productId);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center max-w-md mx-auto">
          <h3 className="text-xl font-semibold">Your wishlist is empty</h3>
          <p className="text-gray-500 mt-2">
            Add items to your wishlist to see them here
          </p>
          <div className="mt-4">
            <Link href="/products">
              <Button className="bg-gray-500 text-white cursor-pointer">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>

      <WishListTable
        items={items}
        handleAddToCart={handleAddToCart}
        handleRemoveFromWishlist={handleRemoveFromWishlist}
      />
      <div className="mt-4">
        <Link href="/products">
          <Button className="bg-gray-500 text-white cursor-pointer">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default WishList;
