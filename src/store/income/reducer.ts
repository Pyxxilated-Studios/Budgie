import { cloneDeep } from "lodash";

import {
  IncomeState,
  IncomeType,
  ADD_TAX_ITEM,
  REMOVE_TAX_ITEM,
  UPDATE_TAX_ITEM,
} from "./types";

const initialState: IncomeState = {
  deductibles: {
    taxes: [],
    other: 0,
  },
  other: 0,
  income: 0,
};

const IncomeReducer = (
  state: IncomeState = initialState,
  action: IncomeType
) => {
  switch (action.type) {
    case ADD_TAX_ITEM: {
      const newState = cloneDeep(state);
      newState.deductibles.taxes.push(action.item);
      return newState;
    }

    case REMOVE_TAX_ITEM: {
      const newState = cloneDeep(state);
      newState.deductibles.taxes.splice(action.index, 1);
      return newState;
    }

    case UPDATE_TAX_ITEM: {
      const newState = cloneDeep(state);
      newState.deductibles.taxes[action.index] = action.item;
      return newState;
    }

    default:
      return state;
  }
};

export default IncomeReducer;
