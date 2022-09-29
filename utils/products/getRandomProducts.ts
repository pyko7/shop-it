import { Product } from "../fetchProducts/getAllProducts";

export const getRandomProducts = (
  data: Product[],
  quantity: Number,
  array: Product[]
): Product[] => {
  if (data) {
    for (let i = 0; i < quantity; i++) {
      let randomProduct: Product =
        data[Math.floor(Math.random() * data?.length)];
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
