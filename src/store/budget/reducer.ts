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
  weeks: 365 / 7,
  fortnights: 365 / 14,
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
      const amount = Number(state.budget[action.index].amount) || 0;
      state.total -= convertToYearly(
        state,
        amount,
        state.budget[action.index].frequency
      );
      state.budget.splice(action.index, 1);
      return { ...state };

    case UPDATE_BUDGET_ITEM: {
      const amountBefore = Number(state.budget[action.index].amount) || 0;
      state.total -= convertToYearly(
        state,
        amountBefore,
        state.budget[action.index].frequency
      );

      state.budget[action.index] = {
        ...state.budget[action.index],
        [action.property]: action.value,
      };

      const amountAfter = Number(state.budget[action.index].amount) || 0;
      state.total += convertToYearly(
        state,
        amountAfter,
        state.budget[action.index].frequency
      );

      return { ...state };
    }

    default:
      return state;
  }
}

const convertToYearly = (
  state: BudgetState,
  amount: number,
  frequency: Frequency
): number => {
  switch (frequency) {
    case Frequency.Weekly:
      return amount * state.weeks;
    case Frequency.Fortnightly:
      return amount * state.fortnights;
    case Frequency.Monthly:
      return amount * 12;
    case Frequency.Yearly:
      return amount;
  }
};
