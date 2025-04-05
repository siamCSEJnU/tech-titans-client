import ProductDetail from "@/components/product-detail";
import { stripe } from "@/lib/stripe";
import React from "react";

const ProductPage = async ({ params }) => {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });
  return <ProductDetail product={product}></ProductDetail>;
};

export default ProductPage;
