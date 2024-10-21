import { itemtype ,actionType} from "../../interface/type";

const initialState: itemtype[] = [];

export const orderlist_reducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "placeorder":
      return state;

    default:
      return state;
  }
};
