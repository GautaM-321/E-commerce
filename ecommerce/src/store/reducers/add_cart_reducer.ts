import { itemtype,actionType } from "../../interface/type";


const initialState: itemtype[] = [];

export const add_cart_reducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "add-cart":
      return action.payload;
      

    default:
      return state;
  }
};
