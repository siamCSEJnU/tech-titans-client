import { fetchAllCategories } from "@/lib/apis/category-api";
import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  groupedCategories: {},
  fetchGroupCategories: async () => {
    const categories = await fetchAllCategories();
    const grouped = categories?.reduce((acc, cat) => {
      if (!cat.parent_id) {
        // It's a parent category
        acc[cat.id] = {
          ...cat,
          subcategories: [],
        };
      } else {
        // It's a subcategory
        if (acc[cat.parent_id]) {
          acc[cat.parent_id].subcategories.push(cat);
        } else {
          // In case parent isn't created yet (edge case)
          acc[cat.parent_id] = {
            id: cat.parent_id,
            name: "", // fallback name
            parent_id: null,
            subcategories: [cat],
          };
        }
      }
      return acc;
    }, {});
    set({ groupedCategories: grouped });
  },
}));
