type Product = {
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

export const getProductById = async (id: number): Promise<Product> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  return (await res.json()) as Promise<Product>;
};
