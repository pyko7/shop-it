export type Product = {
  brand: string;
  category: string;
  description: string;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};

type ProductList = {
  limit: number;
  products: Array<Product>;
  skip: number;
  total: number;
};

export const getAllProducts = async (): Promise<ProductList> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?limit=100`
  );
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  return (await res.json()) as Promise<ProductList>;
};
