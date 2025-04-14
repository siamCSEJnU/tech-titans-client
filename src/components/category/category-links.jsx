import { slugify } from "@/lib/slugify";
import Link from "next/link";
import React from "react";

const CategoryLinks = ({ groupedCategories }) => {
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
      {/* Loop over groupedCategories */}
      {Object.values(groupedCategories).map((cat) => (
        <div key={cat.id} className="relative group">
          <Link
            href={`/category/${slugify(cat.name)}`}
            className="text-sm text-white p-2 rounded-sm bg-gray-500 hover:bg-gray-600"
          >
            {cat.name}
          </Link>

          {/* Subcategories dropdown */}
          {cat.subcategories.length > 0 && (
            <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-white shadow-lg z-10 rounded-sm">
              {cat.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/category/${slugify(sub.name)}`}
                  className="block whitespace-nowrap px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryLinks;
