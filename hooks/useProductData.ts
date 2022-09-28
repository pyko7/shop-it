import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Product } from "../utils/fetchProducts/getAllProducts";
import { getProductById } from "../utils/fetchProducts/getProductsById";

const useProductData = (id: number): UseQueryResult<Product> => {
  return useQuery(["newArrival", id], () => getProductById(id));
};

export default useProductData;
