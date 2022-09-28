import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ProductList } from "../utils/fetchProducts/getAllProducts";
import { getAllProducts } from "../utils/fetchProducts/getAllProducts";

const useAllProductsData = (): UseQueryResult<ProductList> => {
  return useQuery(["allProducts"], () => getAllProducts());
};

export default useAllProductsData;
