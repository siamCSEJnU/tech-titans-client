import { slugify } from "@/lib/slugify";
import Link from "next/link";
import React from "react";

const CategoryLinks = ({ categories }) => {
  return (
    <div className="w-4/5 mx-auto hidden md:flex justify-center items-center space-x-4 px-4 py-2 bg-white border-t">
      <Link
        href="/"
        className="text-sm text-white p-2 rounded-sm bg-gray-500 hover:bg-gray-600"
      >
        Home
      </Link>
      <Link
        href="/products"
        className="text-sm text-white p-2 rounded-sm bg-gray-500 hover:bg-gray-600"
      >
        All Products
      </Link>
      <Link
        href="/checkout"
        className="text-sm text-white p-2 rounded-sm bg-gray-500 hover:bg-gray-600"
      >
        Checkout
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat?.id}
          href={`/category/${slugify(cat?.name)}`}
          className="text-sm text-white p-2 rounded-sm bg-gray-500 hover:bg-gray-600"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoryLinks;
