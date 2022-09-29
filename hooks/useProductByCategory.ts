import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Product } from "../utils/fetchProducts/getAllProducts";
import { getProductByCategories } from "../utils/fetchProducts/getProductsByCategories";

const useProductByCategory = (category: string): UseQueryResult<Product> => {
  return useQuery(["productByCategory", category], () =>
    getProductByCategories(category)
  );
};

export default useProductByCategory;
