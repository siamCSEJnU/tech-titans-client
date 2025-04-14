export const fetchAllCategories = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/categories");
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Fetch categories error:", error);
    throw error;
  }
};

export const createCategory = async (data) => {
  const res = await fetch("http://127.0.0.1:8000/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create category");
  return await res.json();
};

export const updateCategory = async (id, data) => {
  const res = await fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update category");
  return await res.json();
};

export const deleteCategory = async (id) => {
  const res = await fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete category");
  return true;
};
