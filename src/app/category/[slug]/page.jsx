import React from "react";
import ProductsList from "@/components/products-list";
import { fetchAllCategories, fetchAllProducts } from "@/lib/api";
import { slugify } from "@/lib/slugify";

const CategoryProductsPage = async ({ params }) => {
  const p = await params;
  const { slug } = p;
  const decodedCategoryName = decodeURIComponent(slug); // Decode if needed

  const categories = await fetchAllCategories();
  const category = categories?.find(
    (cat) => slugify(cat?.name) === decodedCategoryName
  );
  const categoryId = category?.id;
  const allProducts = await fetchAllProducts();
  const products = allProducts?.filter(
    (product) => product?.category_id === categoryId
  );

  return (
    <div className="pb-16">
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8">
        {category?.name} Products
      </h1>

      {products?.length > 0 ? (
        <ProductsList products={products} />
      ) : (
        <div className="text-center text-gray-500 mt-10 text-lg">
          No products available in this category.
        </div>
      )}
    </div>
  );
};

export default CategoryProductsPage;
