// reducers/index.js

import { combineReducers } from "redux";
import CartReducer from "./cartReducers";

const rootReducer = combineReducers({
    cart: CartReducer,
    // Add other reducers here
});

export default rootReducer;
