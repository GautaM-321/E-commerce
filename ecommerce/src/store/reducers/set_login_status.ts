import { actionType } from "../../interface/type";
const initialState = {
  name: "",
  email: "",
  user_status: false,
};

export const set_user_status = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "user_login_status":
      return action.payload;

    case "user_logout_status":
      return action.payload;

    default:
      return state;
  }
};
