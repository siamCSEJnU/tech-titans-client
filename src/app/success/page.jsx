"use client";
import { useEffect, useState } from "react";

import Confetti from "react-confetti";

import Link from "next/link";
import Swal from "sweetalert2";

import { useCartStore } from "../../../store/cart-store";
import { useAuthStore } from "../../../store/authStore";
import { createPayment } from "@/lib/apis/payment-api";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const SuccessPage = () => {
  const { clearCart, items } = useCartStore();
  const { user } = useAuthStore();
  const [sessionId, setSessionId] = useState(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("session_id");
    if (id) setSessionId(id);
  }, [searchParams]);

  useEffect(() => {
    if (!items.length || !sessionId) return;

    const registerPayment = async () => {
      try {
        //  Get session info from Stripe
        const res = await fetch("/api/payment/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();
        const session = data?.session;

        const paymentData = {
          transaction_id: session?.payment_intent,
          total_amount: items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
          email: user?.email,
          mobile_number: user?.mobile_number || "",
          products: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        };

        await createPayment(paymentData);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Payment successful!",
          showConfirmButton: false,
          timer: 1500,
        });

        clearCart();
      } catch (error) {
        clearCart();
        // console.log(error);

        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message || "Payment failed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };

    registerPayment();
  }, [items, sessionId, user, clearCart]);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <Confetti width={1500} height={1000} recycle={false} />
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="mb-4">Thank you for your purchase.</p>
      <Link href="/products">
        <Button className="bg-gray-500">Continue Shopping</Button>
      </Link>
    </div>
  );
};

export default SuccessPage;
