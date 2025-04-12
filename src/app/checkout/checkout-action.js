"use server";

import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

const checkoutAction = async (formData) => {
  const itemsJson = formData.get("items");
  const items = JSON.parse(itemsJson);

  const line_items = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: { name: item.name },
      unit_amount: Math.round(Number(item.price) * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
  });

  redirect(session.url); // Redirects user to Stripe Checkout
};

export default checkoutAction;
