import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import BudgetReducer from "./budget/reducer";
import SystemReducer from "./system/reducer";

const RootReducer = combineReducers({
  budget: BudgetReducer,
  system: SystemReducer,
});

export type RootState = ReturnType<typeof RootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    RootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
