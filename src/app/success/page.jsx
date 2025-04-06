"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useCartStore } from "../../../store/cart-store";
import { Button } from "@/components/ui/button";

const SuccessPage = () => {
  const { clearCart } = useCartStore();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="mb-4">
        Thank you for your purchase. Your order is being processed.
      </p>
      <Link href="/products">
        <Button className="  cursor-pointer bg-blue-500">
          {" "}
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};

export default SuccessPage;
