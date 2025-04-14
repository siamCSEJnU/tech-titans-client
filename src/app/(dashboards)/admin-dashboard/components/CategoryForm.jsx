"use client";
import { useState } from "react";

export const CategoryForm = ({
  category = null,
  onCancel,
  onSubmit,
  categories,
}) => {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    parent_id: category?.parent_id || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Parent Category</label>
        <select
          name="parent_id"
          value={formData.parent_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">None</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gray-500 text-white rounded cursor-pointer"
        >
          {category ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};
