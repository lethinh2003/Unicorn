import { combineReducers } from "redux";

import favoriteProductsReducer from "./favoriteProducts";
import loadingBoxReducer from "./loadingBox";
const reducers = combineReducers({
  favoriteProducts: favoriteProductsReducer,
  loadingBox: loadingBoxReducer,
});

export default (state, action) => reducers(state, action);
