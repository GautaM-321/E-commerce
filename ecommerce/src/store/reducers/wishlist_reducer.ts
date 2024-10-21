import { actionType } from "../../interface/type";
const initialState: any[] = [];
export const wishlist_reducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "wishlist":
      return action.payload;

    default:
      return state;
  }
};
