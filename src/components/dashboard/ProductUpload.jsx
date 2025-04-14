"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { uploadProduct } from "@/lib/apis/seller-products-api";
import { fetchAllCategories } from "@/lib/apis/category-api";

const ProductUploadForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      const allCategories = await fetchAllCategories();
      const subCategories = allCategories?.filter(
        (cat) => cat?.parent_id !== null
      );
      setCategories(subCategories || []);
    };
    getCategories();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const watchImage = watch("image");

  useEffect(() => {
    if (watchImage && watchImage[0]) {
      const previewUrl = URL.createObjectURL(watchImage[0]);
      setPreviewImage(previewUrl);
    }
  }, [watchImage]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category_id", data.category_id);
      formData.append("image", data.image[0]);

      await uploadProduct(formData);

      toast.success("Product uploaded successfully!", { autoClose: 1100 });
      reset();
      setPreviewImage(null);
      router.push("/seller-dashboard");
    } catch (error) {
      toast.error(error.message || "Failed to upload product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6 text-center">Upload New Product</h2>
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

        <div className=" space-y-1">
          <label htmlFor="images" className="block font-bold">
            Product Image
          </label>
          <div className="mt-1 flex items-center gap-4">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImagePlus className="w-8 h-8 text-gray-400" />
                <p className="text-sm text-gray-500">Upload image</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                {...register("image", { required: "Image is required" })}
              />
            </label>
          </div>
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>

        {/* Image previews */}
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-32 h-32 object-cover mt-4 border rounded"
          />
        )}

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Upload Product"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ProductUploadForm;
