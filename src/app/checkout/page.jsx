"use client";
import React from "react";
import { useCartStore } from "../../../store/cart-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import checkoutAction from "./checkout-action";
import Link from "next/link";

const CheckoutPage = () => {
  const { items, removeItem, addItem, clearCart } = useCartStore();
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  if (totalPrice === 0 || items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 md:mb-12 md:mt-2  text-center ">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Link href="/products">
          <Button className="  cursor-pointer bg-gray-500">
            {" "}
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8  rounded-sm">
      <h1 className="text-3xl font-bold mb-8 text-center"> Checkout</h1>
      <Card className="max-w-md mx-auto mb-8 bg-gray-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col gap-2 border-b pb-2">
                <div className="flex justify-between">
                  <span className="font-medium">{item?.name}</span>
                  <span className="font-semibold">
                    ${item.price * item.quantity}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => removeItem(item?.id)}
                    className="cursor-pointer"
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold">
                    {item?.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => addItem({ ...item, quantity: 1 })}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-2 text-lg font-semibold">
            Total :${totalPrice}{" "}
          </div>
        </CardContent>
      </Card>
      <form action={checkoutAction} className="max-w-md mx-auto">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button type="submit" className="w-full cursor-pointer mb-4">
          Proceed to Payment
        </Button>
        <Button
          variant="outline"
          className="w-full cursor-pointer  "
          onClick={(e) => {
            e.preventDefault();
            clearCart();
          }}
        >
          Clear Cart
        </Button>
      </form>
    </div>
  );
};

export default CheckoutPage;
