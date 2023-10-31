import { combineReducers } from "redux";

import favoriteProductsReducer from "./favoriteProducts";

const reducers = combineReducers({
  favoriteProducts: favoriteProductsReducer,
});

export default (state, action) => reducers(state, action);
