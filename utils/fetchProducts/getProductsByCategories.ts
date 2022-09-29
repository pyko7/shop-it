import { getAllProducts, Product } from "./getAllProducts";

export const getProductByCategories = async (
  category: string
): Promise<Product[]> => {
  const allProducts: Product[] = await getAllProducts();
  const productsByCategory: Product[] = allProducts?.filter(
    (product: Product) => product.category === category
  );
  return productsByCategory;
};
