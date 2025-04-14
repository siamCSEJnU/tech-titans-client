"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { Loader2, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

import { fetchAllCategories } from "@/lib/apis/category-api";
import { getProduct, updateProduct } from "@/lib/apis/seller-products-api";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productData, categoriesData] = await Promise.all([
          getProduct(productId),
          fetchAllCategories(),
        ]);

        setProduct(productData);
        setCategories(categoriesData.filter((cat) => cat.parent_id !== null));

        // Set form values
        setValue("name", productData.name);
        setValue("description", productData.description);
        setValue("price", productData.price);
        setValue("stock", productData.stock);
        setValue("category_id", productData.category_id);
        setPreviewImage(productData.image);
      } catch (error) {
        toast.error("Failed to load product data");
        router.push("/seller-dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();

      // Append all fields
      Object.keys(data).forEach((key) => {
        if (key !== "image") {
          formData.append(key, data[key]);
        }
      });

      // Append image if changed
      const fileInput = document.getElementById("image");
      if (fileInput?.files[0]) {
        formData.append("image", fileInput.files[0]);
      }

      await updateProduct(productId, formData);
      toast.success("Product updated successfully", { autoClose: 1100 });
      router.push("/seller-dashboard");
    } catch (error) {
      toast.error(error.message, { autoClose: 1300 });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className=" space-y-1">
          <label htmlFor="name" className="block font-bold">
            Product Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Product name is required" })}
            placeholder="Enter product name"
            className="w-full border p-2 rounded-md  focus:ring-1  outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className=" space-y-1">
          <label htmlFor="description" className="block font-bold">
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Enter product description"
            rows={4}
            className="w-full border p-2 rounded-md  focus:ring-1  outline-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className=" space-y-1">
            <label htmlFor="price" className="block font-bold">
              Price ($)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              {...register("price", {
                required: "Price is required",
                min: { value: 0.01, message: "Price must be greater than 0" },
              })}
              placeholder="0.00"
              className="w-full border p-2 rounded-md  focus:ring-1  outline-none"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className=" space-y-1">
            <label htmlFor="stock" className="block font-bold">
              Stock Quantity
            </label>
            <input
              id="stock"
              type="number"
              {...register("stock", {
                required: "Stock is required",
                min: { value: 0, message: "Stock cannot be negative" },
              })}
              placeholder="0"
              className="w-full border p-2 rounded-md  focus:ring-1  outline-none"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stock.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="category_id" className="block font-bold">
            Category
          </label>
          <select
            id="category_id"
            {...register("category_id", { required: "Category is required" })}
            className="w-full border p-2 rounded-md focus:ring-1 outline-none"
          >
            <option value="">Select a category</option>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
          </select>
          {errors.category_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category_id.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="image" className="block font-bold">
            Product Image
          </label>
          <div className="mt-1 flex items-center gap-4">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-20 h-20 object-cover"
                  />
                ) : (
                  <>
                    <ImagePlus className="w-8 h-8 text-gray-400" />
                    <p className="text-sm text-gray-500">Change image</p>
                  </>
                )}
              </div>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Product"
          )}
        </Button>
      </form>
    </div>
  );
};

export default EditProductPage;
