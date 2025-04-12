import ProductsList from "@/components/product/products-list";
import { fetchAllProducts } from "@/lib/apis/product-api";

// import { stripe } from "@/lib/stripe";
import React from "react";

const ProductsPage = async () => {
  const products = await fetchAllProducts();
  return (
    <div className="pb-8">
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8">
        All Products
      </h1>
      <ProductsList products={products}></ProductsList>
    </div>
  );
};

export default ProductsPage;
