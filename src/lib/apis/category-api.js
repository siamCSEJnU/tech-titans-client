// allCatrogies Fetching

export const fetchAllCategories = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/categories");

    if (!res.ok) {
      throw new Error(`Error fetching categories: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch categories error:", error);
    return [];
  }
};
