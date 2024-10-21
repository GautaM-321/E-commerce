import { actionType } from "../../interface/type";
const initialState: any[] = [];
export const set_productReducer = (
  state = initialState,
  action: actionType
) => {
  switch (action.type) {
    case "Set_Product":
      return action.payload;
    default:
      return state;
  }
};
