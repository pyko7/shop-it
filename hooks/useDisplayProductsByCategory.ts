import useAllProductsData from "./useAllProductsData";
import useProductByCategory from "./useProductByCategory";

export const useDisplayProductsByCategory = (category: string | null) => {
  return category === null || category === "all"
    ? useAllProductsData()
    : useProductByCategory(category);
};
