import ProductDetail from "@/components/product-detail";
import { fetchSingleProduct } from "@/lib/api";
import { stripe } from "@/lib/stripe";
import React from "react";

const ProductPage = async ({ params }) => {
  const { id } = await params;
  const product = await fetchSingleProduct(id);
  if (!product) {
    return (
      <div className="text-center font-semibold text-xl">
        Product not found!!
      </div>
    );
  }
  // const plainProduct = JSON.parse(JSON.stringify(product));
  return <ProductDetail product={product}></ProductDetail>;
};

export default ProductPage;
