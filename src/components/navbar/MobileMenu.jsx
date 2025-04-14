import { slugify } from "@/lib/slugify";
import Link from "next/link";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // optional icons

const MobileMenu = ({ groupedCategories }) => {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (id) => {
    setOpenCategory((prev) => (prev === id ? null : id));
  };

  return (
    <div className="md:hidden bg-white border-t shadow-md">
      <ul className="flex flex-col p-4 space-y-2 text-sm font-medium">
        <li>
          <Link href="/" className="block hover:text-blue-600">
            Home
          </Link>
        </li>
        <li>
          <Link href="/products" className="block hover:text-blue-600">
            All Products
          </Link>
        </li>
        <li>
          <Link href="/wishlist" className="block hover:text-pink-500">
            Wishlist
          </Link>
        </li>
        <li className="pt-2 font-semibold text-gray-600">Categories</li>

        {Object.values(groupedCategories).map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => toggleCategory(cat.id)}
              className="w-full flex justify-between items-center py-2 hover:text-blue-600"
            >
              <span>{cat.name}</span>
              {openCategory === cat.id ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>

            {openCategory === cat.id && (
              <ul className="ml-4 pl-2 border-l border-gray-200 text-sm text-gray-700 space-y-1">
                {cat.subcategories.map((sub) => (
                  <li key={sub.id}>
                    <Link
                      href={`/category/${slugify(sub.name)}`}
                      className="block hover:text-blue-500"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
