import { createContext, useContext, ReactNode, useState } from "react";

type FavoriteProductListProps = { children: ReactNode };
interface FavoriteProductsListContext {
  handleFavorite: (event: any, id: number) => void;
  handleFavoriteIcon: (id: number) => boolean;
}

const FavoriteProductsListContext = createContext(
  {} as FavoriteProductsListContext
);

export const useFavoriteProductsList = () => {
  return useContext(FavoriteProductsListContext);
};

const setProductToFavorite = (favorite: number[]) => {
  localStorage.setItem("favorites", JSON.stringify(favorite));
};

const getFavorites = () => {
  let favoriteList = localStorage.getItem("favorites");
  if (!favoriteList) {
    return [];
  } else {
    return JSON.parse(favoriteList);
  }
};

export const FavoriteListProvider = ({
  children,
}: FavoriteProductListProps) => {
  const [favoriteList, setFavoriteList] = useState<number[]>([]);

  const handleFavorite = (event: any, id: number) => {
    event.preventDefault();
    let favoriteList = getFavorites();
    if (favoriteList.includes(id)) {
      const newList = favoriteList.filter(
        (productId: number) => productId !== id
      );
      setFavoriteList(newList);
      return setProductToFavorite(newList);
    } else {
      favoriteList.push(id);
      setFavoriteList(favoriteList);
      return setProductToFavorite(favoriteList);
    }
  };

  const handleFavoriteIcon = (id: number): boolean => {
    let favoriteList = getFavorites();
    return favoriteList.find((productId: number) => productId === id)
      ? true
      : false;
  };

  return (
    <FavoriteProductsListContext.Provider
      value={{ handleFavorite, handleFavoriteIcon }}
    >
      {children}
    </FavoriteProductsListContext.Provider>
  );
};
