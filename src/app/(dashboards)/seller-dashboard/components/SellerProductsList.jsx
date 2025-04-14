"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  deleteProduct,
  getSellerProducts,
} from "@/lib/apis/seller-products-api";
import Swal from "sweetalert2";

const SellerProductsList = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const allProducts = await getSellerProducts();
      setProducts(allProducts);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    router.push(`/seller-dashboard/products/edit/${productId}`);
  };

  const handleDelete = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(productId);
      await deleteProduct(productId);

      // Show success message
      await Swal.fire("Deleted!", "Your product has been deleted.", "success");

      // Refresh the product list
      await fetchProducts();
    } catch (error) {
      Swal.fire(
        "Error!",
        error.message || "Failed to delete product.",
        "error"
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stock
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative w-12 h-12">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {product.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${product.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.stock > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-center items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 cursor-pointer"
                      onClick={() => handleEdit(product.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      <span className="sr-only md:not-sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-8 cursor-pointer"
                      onClick={() => handleDelete(product.id)}
                      disabled={deletingId === product.id}
                    >
                      {deletingId === product.id ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4 mr-1" />
                          <span className="sr-only md:not-sr-only">Delete</span>
                        </>
                      )}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4 p-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow border border-gray-200"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <img
                  src={product.image || "/placeholder-product.png"}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                    e.target.src = "/placeholder-product.png";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      ${Number(product.price).toFixed(2)}
                    </p>
                  </div>
                  <span
                    className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                      product.stock > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock} in stock
                  </span>
                </div>

                <div className="mt-3 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 cursor-pointer"
                    onClick={() => handleEdit(product.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    <span className="sr-only md:not-sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-8 cursor-pointer"
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                  >
                    {deletingId === product.id ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4 mr-1" />
                        <span className="sr-only md:not-sr-only">Delete</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerProductsList;
