import { createContext, useContext, ReactNode, useReducer } from "react";
import favoriteReducer, { ListOfId } from "../reducers/favoriteReducer";

type FavoriteProductListProps = { children: ReactNode };

interface FavoriteProductsListContext {
  /**
   * Function that handle if a item is set in favorite list or not
   */
  handleFavorite: (event: any, id: number) => void;
  /**
   * Function that handle the style of the heart icon
   */
  handleFavoriteIcon: (id: number) => boolean;
  /** List of items' id set in favorites */
  state: ListOfId;
}

const FavoriteProductsListContext = createContext(
  {} as FavoriteProductsListContext
);

export const useFavoriteProductsList = () => {
  return useContext(FavoriteProductsListContext);
};

const addProductToFavorite = (favorite: ListOfId) => {
  localStorage.setItem("favorites", JSON.stringify(favorite));
};

const getFavorites = () => {
  let favoriteList: string | null = null;
  if (typeof window !== "undefined") {
    favoriteList = localStorage?.getItem("favorites");
  }
  if (!favoriteList) {
    return {
      idList: [],
    };
  } else {
    return JSON.parse(favoriteList);
  }
};

export const FavoriteListProvider = ({
  children,
}: FavoriteProductListProps) => {
  const initialState = getFavorites();

  const [state, dispatch] = useReducer(favoriteReducer, initialState);

  const handleFavorite = (event: any, id: number) => {
    event.preventDefault();
    if (!state.idList.includes(id)) {
      const updatedList: number[] = state.idList.concat(id);
      addProductToFavorite({ idList: updatedList });
      dispatch({
        type: "ADD_TO_FAVORITE",
        payload: updatedList,
      });
    } else {
      const updatedList: number[] = state.idList.filter(
        (productId: number) => productId !== id
      );
      addProductToFavorite({ idList: updatedList });
      dispatch({
        type: "REMOVE_FROM_FAVORITE",
        payload: updatedList,
      });
    }
  };

  const handleFavoriteIcon = (id: number): boolean => {
    return state.idList.find((productId: number) => productId === id)
      ? true
      : false;
  };

  return (
    <FavoriteProductsListContext.Provider
      value={{
        handleFavorite,
        handleFavoriteIcon,
        state,
      }}
    >
      {children}
    </FavoriteProductsListContext.Provider>
  );
};
