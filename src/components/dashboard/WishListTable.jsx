"use client";
import React from "react";
import { Button } from "../ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";

const WishListTable = ({
  items,
  handleAddToCart,
  handleRemoveFromWishlist,
}) => {
  console.log(items);

  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <table className="hidden md:table min-w-full bg-white rounded-lg shadow border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-center">Product</th>
            <th className="px-6 py-3 text-center">Price</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items?.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-16 relative">
                    {item.product?.image && (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.product?.name}
                    </div>
                    <div className="text-sm text-gray-500 line-clamp-1">
                      {item.product?.description}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                ${parseFloat(item.product?.price || 0).toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border border-gray-200">
                <div className="flex space-x-2 justify-center items-center">
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(item.product)}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="hidden sm:inline">Add to Cart</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveFromWishlist(item.product_id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {items?.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow border border-gray-200"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 h-20 w-20 relative">
                {item.product?.image && (
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900">
                  {item.product?.name}
                </div>
                <div className="text-sm text-gray-500 line-clamp-2">
                  {item.product?.description}
                </div>
                <div className="mt-2 text-sm font-semibold">
                  ${parseFloat(item.product?.price || 0).toFixed(2)}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between space-x-2">
              <Button
                size="sm"
                onClick={() => handleAddToCart(item.product)}
                className="flex-1 flex items-center justify-center gap-1"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRemoveFromWishlist(item.product_id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishListTable;
