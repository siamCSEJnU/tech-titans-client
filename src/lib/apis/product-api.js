// allProducts Fetching
export const fetchAllProducts = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/products", {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Error fetching products: ${res.statusText}`);
    }

    const products = await res.json();
    return products;
  } catch (error) {
    console.error("Fetch products error:", error);
    return [];
  }
};

// singleProduct Fetching
export async function fetchSingleProduct(id) {
  const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product with ID ${id}`);
  }

  const product = await res.json();
  return product;
}
