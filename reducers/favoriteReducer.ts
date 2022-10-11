export interface ListOfId {
  idList: number[];
}

interface FavoriteAction {
  type: "ADD_TO_FAVORITE" | "REMOVE_FROM_FAVORITE";
  payload: number[];
}

const favoriteReducer = (state: ListOfId, action: FavoriteAction) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        idList: payload,
      };
    case "REMOVE_FROM_FAVORITE":
      return {
        ...state,
        idList: payload,
      };
    default:
      throw Error("Unknown action: " + action);
  }
};

export default favoriteReducer;
