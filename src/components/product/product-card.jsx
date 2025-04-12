import Link from "next/link";
import React from "react";
import Image from "next/image";

import { slugify } from "@/lib/slugify";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const ProductCard = ({ product }) => {
  // console.log(product);

  const price = product?.price;
  return (
    <Link
      href={`/products/${product?.id}-${slugify(product?.name)}`}
      className="block h-full"
    >
      <Card className="group hover:shadow-2xl transition duration-300 py-0 h-full flex flex-col border-gray-300 gap-0 bg-gray-100">
        {product.image && (
          <div className="relative h-60 w-full">
            <Image
              src={`${product?.image?.replace("localhost", "127.0.0.1")}`}
              alt={product?.name}
              layout="fill"
              // sizes="(max-width: 768px) 100vw, 500px"
              // priority={true}
              // width={400}
              // height={200}
              objectFit="cover"
              className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg"
            />
          </div>
        )}
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-bold text-gray-800">
            {product?.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col justify-between">
          {product?.description && (
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
          )}
          {price && price && (
            <p className="text-lg font-semibold text-gray-900">${price}</p>
          )}
          <Button className="mt-4 bg-black text-white cursor-pointer">
            View Details
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
