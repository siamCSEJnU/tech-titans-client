"use client";
import {
  createCategory,
  deleteCategory,
  fetchAllCategories,
  updateCategory,
} from "@/lib/apis/category-api";
import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { CategoryForm } from "../components/CategoryForm";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Swal from "sweetalert2";

const AllCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await fetchAllCategories();
      setCategories(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      await createCategory(formData);
      toast.success("Category created successfully", { autoClose: 1000 });
      loadCategories();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateCategory(currentCategory.id, formData);
      toast.success("Category updated successfully");
      loadCategories();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
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
      await deleteCategory(id);
      toast.success("Category deleted successfully", { autoClose: 1000 });
      loadCategories();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openEditModal = (category) => {
    setCurrentCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentCategory(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Categories</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2  text-white rounded cursor-pointer"
        >
          Add Category
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0    bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {currentCategory ? "Edit Category" : "Add New Category"}
            </h2>
            <CategoryForm
              category={currentCategory}
              categories={categories}
              onCancel={closeModal}
              onSubmit={currentCategory ? handleUpdate : handleCreate}
            />
          </div>
        </div>
      )}

      {loading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left border">ID</th>
                <th className="p-3 text-left border">Name</th>
                <th className="p-3 text-left border">Parent</th>
                <th className="p-3 text-center border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{category.id}</td>
                  <td className="p-3 border">{category.name}</td>
                  <td className="p-3 border">
                    {category.parent_id
                      ? categories.find((c) => c.id === category.parent_id)
                          ?.name
                      : "-"}
                  </td>
                  <td className="p-3 border">
                    <div className="flex items-center justify-center gap-5">
                      <button
                        onClick={() => openEditModal(category)}
                        className="px-3 py-1 bg-gray-500 text-white rounded cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default AllCategoriesPage;
