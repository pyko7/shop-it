import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Product } from "../utils/fetchProducts/getAllProducts";
import { getProductById } from "../utils/fetchProducts/getProductsById";

const useProductByIdData = (id: number): UseQueryResult<Product> => {
  return useQuery(["product", id], () => getProductById(id));
};

export default useProductByIdData;
