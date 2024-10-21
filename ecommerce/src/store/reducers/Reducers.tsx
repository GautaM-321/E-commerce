import { combineReducers } from "redux";
import { set_productReducer } from "./set_product_reducer";
import { set_user_status } from "./set_login_status";
import { add_cart_reducer } from "./add_cart_reducer";
import { wishlist_reducer } from "./wishlist_reducer";
import { orderlist_reducer } from "./orderlist_reducer";
export const allreducers = combineReducers({
  set_productReducer,
  set_user_status,
  add_cart_reducer,
  wishlist_reducer,
  orderlist_reducer,
});
