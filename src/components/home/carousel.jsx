"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/lib/slugify";
// import Stripe from "stripe";

const Carousel = ({ products }) => {
  // console.log(products);

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[currentIndex];
  const price = currentProduct?.price;

  return (
    <Link
      href={`/products/${currentProduct?.id}-${slugify(currentProduct?.name)}`}
    >
      {" "}
      <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300 cursor-pointer ">
        {currentProduct?.image && (
          <div className="relative h-80 w-full ">
            <Image
              priority
              alt={currentProduct.name}
              src={`${currentProduct.image.replace("localhost", "127.0.0.1")}`}
              layout="fill"
              // sizes="(max-width: 768px) 100vw, 500px"
              // priority={true}
              // width={400}
              // height={200}
              objectFit="cover"
              className="transition-opacity  duration-500 ease-in-out "
            ></Image>
          </div>
        )}
        <CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <CardTitle className="text-3xl font-bold bg-gray-500 px-3 py-2 rounded-sm text-white mb-2">
            {currentProduct?.name}
          </CardTitle>
          {price && (
            <p className="text-xl font-semibold bg-gray-500 px-3 py-2 rounded-md text-white">
              ${price}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default Carousel;
