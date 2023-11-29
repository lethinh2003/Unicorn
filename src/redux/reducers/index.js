import { combineReducers } from "redux";

import cartReducer from "./cart";
import favoriteProductsReducer from "./favoriteProducts";
import loadingBoxReducer from "./loadingBox";
import orderReducer from "./order";
import viewedProductsReducer from "./viewedProducts";
const reducers = combineReducers({
  favoriteProducts: favoriteProductsReducer,
  viewedProducts: viewedProductsReducer,
  loadingBox: loadingBoxReducer,
  cart: cartReducer,
  order: orderReducer,
});

export default (state, action) => reducers(state, action);
