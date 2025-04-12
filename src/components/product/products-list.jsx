"use client";
import React from "react";
import ProductCard from "./product-card";
import { useSearchParams } from "next/navigation";

const ProductsList = ({ products }) => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const filteredProducts = products.filter((product) => {
    const term = searchTerm?.toLowerCase();
    const nameMatch = product?.name?.toLowerCase().includes(term);
    const descriptionMatch = product?.description?.toLowerCase().includes(term);
    return nameMatch || descriptionMatch;
  });
  return (
    <div className="mb-7">
      {filteredProducts.length > 0 ? (
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500 mt-10 text-lg">
          No products match your search.
        </div>
      )}
    </div>
  );
};

export default ProductsList;
