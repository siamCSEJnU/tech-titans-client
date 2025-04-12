"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight, Heart, HeartOff } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "../../../store/cart-store";

import { useAuthStore } from "../../../store/authStore";
import { useWishlistStore } from "../../../store/wishlist-store";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const ProductDetail = ({ product }) => {
  const { items, addItem, removeItem } = useCartStore();
  const router = useRouter();
  const {
    items: wishlistItems,
    addToWishlist,
    removeFromWishlist,
    fetchWishlist,
  } = useWishlistStore();
  const { token, user } = useAuthStore();
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const price = product?.price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isInWishlist = wishlistItems.some(
    (item) => item.product_id === product.id
  );

  useEffect(() => {
    if (user?.email && wishlistItems.length === 0) {
      fetchWishlist(user.email);
    }
  }, [user?.email]);

  const onAddItem = () => {
    addItem({
      id: product?.id,
      name: product?.name,
      imageUrl: product?.image || null,
      price: price,
      quantity: 1,
    });
  };

  const handleWishlistToggle = async () => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to manage your wishlist.",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
      return;
    }

    setWishlistLoading(true);
    try {
      if (isInWishlist) {
        await removeFromWishlist(user.email, product.id);
      } else {
        await addToWishlist(user.email, product.id);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center bg-gray-100 rounded-sm">
      {product.image && (
        <div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-hidden">
          <Image
            priority
            src={`${product?.image?.replace("localhost", "127.0.0.1")}`}
            alt={product?.name}
            layout="fill"
            objectFit="cover"
            className="transition duration-300 hover:opacity-90"
          />
        </div>
      )}
      <div className="md:w-1/2">
        <div>
          <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
        </div>

        {product.description && (
          <p className="text-gray-700 mb-4">{product.description}</p>
        )}
        {price && (
          <p className="text-lg font-semibold text-gray-900">
            ${(price * quantity).toFixed(2)}
          </p>
        )}
        <div className="flex items-center space-x-4 mt-2">
          <Button
            variant="outline"
            onClick={() => removeItem(product.id)}
            className="cursor-pointer"
          >
            -
          </Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={onAddItem}
          >
            +
          </Button>
        </div>
        <div className="flex gap-4 mt-6 items-center">
          <Link href={"/checkout"}>
            <Button className="cursor-pointer bg-gray-500">
              Checkout <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
          <button
            variant="ghost"
            onClick={handleWishlistToggle}
            disabled={wishlistLoading}
            className="p-2 cursor-pointer"
            aria-label={
              isInWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            {isInWishlist ? (
              <Heart className="  fill-pink-500 text-pink-500 " />
            ) : (
              <Heart className=" text-gray-500 hover:text-pink-500 " />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
