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
import { usePathname, useRouter } from "next/navigation";

const ProductDetail = ({ product }) => {
  const { items, addItem, removeItem } = useCartStore();
  const pathname = usePathname();
  const router = useRouter();
  const {
    items: wishlistItems,
    addToWishlist,
    removeFromWishlist,
    fetchWishlist,
  } = useWishlistStore();
  const { token, user, setIntendedPath } = useAuthStore();
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const price = product?.price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isInWishlist = wishlistItems.some(
    (item) => item.product_id === product.id
  );

  const isUserAuthorized = user?.type === "user" && user?.mobile_number;

  useEffect(() => {
    if (user?.type === "user" && !user?.mobile_number) {
      Swal.fire({
        icon: "info",
        title: "Mobile Number Missing",
        text: "Please update your profile with a mobile number before proceeding.",
        confirmButtonText: "Go to Profile",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/user-dashboard/update-profile");
          setIntendedPath(pathname);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (user?.email && wishlistItems.length === 0) {
      fetchWishlist(user.email);
    }
  }, [user?.email]);

  const onAddItem = () => {
    if (!isUserAuthorized) {
      Swal.fire({
        icon: "warning",
        title: "Action Restricted",
        text: "Please complete your profile to add items to cart",
        confirmButtonText: "Update Profile",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/user-dashboard/update-profile");
          setIntendedPath(pathname);
        }
      });
      return;
    }
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
          setIntendedPath(pathname);
          router.push("/login");
        }
      });
      return;
    }

    if (!isUserAuthorized) {
      Swal.fire({
        icon: "warning",
        title: "Profile Update Required",
        text: "Please complete your profile to manage wishlist",
        confirmButtonText: "Update Profile",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/user-dashboard/update-profile");
          setIntendedPath(pathname);
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

  const handleCheckout = (e) => {
    if (!isUserAuthorized) {
      e.preventDefault();
      Swal.fire({
        icon: "warning",
        title: "Profile Update Required",
        text: "Please complete your profile to proceed to checkout",
        confirmButtonText: "Update Profile",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/user-dashboard/update-profile");
          setIntendedPath(pathname);
        }
      });
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
            disabled={!isUserAuthorized || quantity === 0}
          >
            -
          </Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={onAddItem}
            disabled={!isUserAuthorized}
          >
            +
          </Button>
        </div>

        <div className="flex gap-4 mt-6 items-center">
          <Link href={isUserAuthorized ? "/checkout" : "#"}>
            <Button
              className={`cursor-pointer ${
                isUserAuthorized
                  ? "bg-gray-500"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              onClick={!isUserAuthorized ? handleCheckout : undefined}
              disabled={!isUserAuthorized || quantity === 0}
            >
              Checkout <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
          <button
            variant="ghost"
            onClick={handleWishlistToggle}
            disabled={wishlistLoading || !isUserAuthorized}
            className={`p-2 ${
              !isUserAuthorized ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            aria-label={
              isInWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            {isInWishlist ? (
              <Heart className="fill-pink-500 text-pink-500" />
            ) : (
              <Heart
                className={`${
                  isUserAuthorized
                    ? "text-gray-500 hover:text-pink-500"
                    : "text-gray-300"
                }`}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
