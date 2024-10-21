import { legacy_createStore } from "redux";
import { allreducers } from "./reducers/Reducers";

const store = legacy_createStore(allreducers);
 
export default store;
