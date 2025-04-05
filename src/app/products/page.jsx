import ProductsList from "@/components/products-list";
import { stripe } from "@/lib/stripe";
import React from "react";

const ProductsPage = async () => {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });
  return (
    <div className="pb-8">
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8">
        All Products
      </h1>
      <ProductsList products={products.data}></ProductsList>
    </div>
  );
};

export default ProductsPage;
