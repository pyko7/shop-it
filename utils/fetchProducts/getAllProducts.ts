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

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?limit=100`
  );
  const data = await res.json();
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  return data.products as Promise<Product[]>;
};
