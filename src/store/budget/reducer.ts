import {
  Frequency,
  BudgetState,
  BudgetItemType,
  ADD_BUDGET_ITEM,
  DELETE_BUDGET_ITEM,
  UPDATE_BUDGET_ITEM,
} from "./types";

import uuid from "lodash/uniqueId";

const initialState: BudgetState = {
  budget: [],
};

const BudgetReducer = (
  state = initialState,
  action: BudgetItemType
): BudgetState => {
  switch (action.type) {
    case ADD_BUDGET_ITEM:
      state.budget.push({
        frequency: Frequency.Fortnightly,
        expense: "",
        amount: "0.00",
        id: uuid(),
      });
      return { ...state };

    case DELETE_BUDGET_ITEM:
      state.budget.splice(action.index, 1);
      return { ...state };

    case UPDATE_BUDGET_ITEM: {
      state.budget[action.index] = {
        ...state.budget[action.index],
        [action.property]: action.value,
      };

      return { ...state };
    }

    default:
      return state;
  }
};

export default BudgetReducer;
