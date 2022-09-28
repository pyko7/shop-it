import { Product, ProductList } from "../fetchProducts/getAllProducts";

export const getRandomProducts = (
  data: ProductList,
  quantity: Number,
  array: Product[]
): Product[] => {
  if (data) {
    for (let i = 0; i < quantity; i++) {
      let randomProduct: Product =
        data?.products[Math.floor(Math.random() * data?.products.length)];
      const existingProduct: boolean = array.includes(randomProduct);
      if (existingProduct) {
        i--;
      } else {
        array.push(randomProduct);
      }
    }
  }
  return array;
};
