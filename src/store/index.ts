import { Dispatch } from "react";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import {
  combineReducers,
  createStore,
  applyMiddleware,
  AnyAction,
  Action,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import BudgetReducer from "./budget/reducer";
import SystemReducer from "./system/reducer";
import IncomeReducer from "./income/reducer";

const persistConfig = {
  key: "budgie",
  storage,
};

const RootReducer = combineReducers({
  budget: BudgetReducer,
  system: SystemReducer,
  income: IncomeReducer,
});

const persistedReducer = persistReducer(persistConfig, RootReducer);

const configureStore = () => {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    persistedReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
};

const store = configureStore();
const persistor = persistStore(store);

export type RootState = ReturnType<typeof RootReducer>;
export type RootDispatch = Dispatch<AnyAction> &
  ThunkDispatch<RootState, unknown, AnyAction>;
export type RootThunk = ThunkAction<
  any,
  RootState,
  unknown,
  Action<string | void | boolean>
>;

export default { store, persistor };
