import ProductDetail from "@/components/product/product-detail";
import { fetchSingleProduct } from "@/lib/apis/product-api";

// import { stripe } from "@/lib/stripe";
import React from "react";

const ProductPage = async ({ params }) => {
  const p = await params;
  const { slugWithId } = await p;
  const id = slugWithId.split("-")[0]; // Extract the ID from the slug

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
