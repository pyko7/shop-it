import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Product } from "../utils/fetchProducts/getAllProducts";
import { getAllProducts } from "../utils/fetchProducts/getAllProducts";

const useAllProductsData = (): UseQueryResult<Product[]> => {
  return useQuery(["allProducts"], () => getAllProducts(), {
    staleTime: Infinity,
  });
};

export default useAllProductsData;
