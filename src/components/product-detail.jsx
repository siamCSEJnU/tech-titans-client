"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { useCartStore } from "../../store/cart-store";

const ProductDetail = ({ product }) => {
  const { items, addItem, removeItem } = useCartStore();
  const price = product?.price;

  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product?.id,
      name: product?.name,
      // description: product.description,
      imageUrl: product?.image ? product.images : null,
      price: price,
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center bg-gray-100 rounded-sm">
      {product.image && (
        <div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-hidden">
          <Image
            priority
            src={`${product?.image?.replace("localhost", "127.0.0.1")}`}
            alt={product?.name}
            layout="fill"
            // sizes="(max-width: 768px) 100vw, 500px"
            // priority={true}
            // width={400}
            // height={200}
            objectFit="cover"
            className="transition duration-300 hover:opacity-90"
          />
        </div>
      )}
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
        {product.description && (
          <p className="text-gray-700 mb-4">{product.description}</p>
        )}
        {price && (
          <p className="text-lg font-semibold text-gray-900">${price}</p>
        )}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => removeItem(product.id)}
            className="cursor-pointer"
          >
            -
          </Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={onAddItem}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
