import {
  Frequency,
  BudgetState,
  BudgetItemTypes,
  ADD_BUDGET_ITEM,
  DELETE_BUDGET_ITEM,
  UPDATE_BUDGET_ITEM,
} from "./types";

import uuid from "lodash/uniqueId";

const initialState: BudgetState = {
  budget: [],
  total: 0,
};

export default function BudgetReducer(
  state = initialState,
  action: BudgetItemTypes
): BudgetState {
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
      state.total -= Number(state.budget[action.index].amount) || 0;
      state.budget.splice(action.index, 1);
      return { ...state };

    case UPDATE_BUDGET_ITEM:
      if (action.property === "amount") {
        state.total -= Number(state.budget[action.index].amount) || 0;
      }
      state.budget[action.index] = {
        ...state.budget[action.index],
        [action.property]: action.value,
      };
      if (action.property === "amount") {
        state.total += Number(state.budget[action.index].amount) || 0;
      }
      return { ...state };

    default:
      return state;
  }
}
