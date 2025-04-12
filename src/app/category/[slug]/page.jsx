import React from "react";
import ProductsList from "@/components/product/products-list";

import { slugify } from "@/lib/slugify";
import { fetchAllCategories } from "@/lib/apis/category-api";
import { fetchAllProducts } from "@/lib/apis/product-api";

const CategoryProductsPage = async ({ params }) => {
  const p = await params;
  const { slug } = p;
  const decodedCategoryName = decodeURIComponent(slug); // Decode if needed

  const categories = await fetchAllCategories();
  const category = categories?.find(
    (cat) => slugify(cat?.name) === decodedCategoryName
  );
  const categoryId = category?.id;
  // Find child categories
  const subCategoryIds = categories
    ?.filter((cat) => cat?.parent_id === categoryId)
    .map((cat) => cat?.id);

  // include both parent(selected) and its subcategories
  const validCategoryIds = [categoryId, ...subCategoryIds];

  const allProducts = await fetchAllProducts();
  const products = allProducts?.filter((product) =>
    validCategoryIds.includes(product?.category_id)
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
