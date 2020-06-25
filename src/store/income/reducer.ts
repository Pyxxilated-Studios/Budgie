import { IncomeState, IncomeType } from "./types";

const initialState: IncomeState = {
  deductibles: {
    taxes: [{ range: [0, 14000], percentage: 14.5 }],
    other: 0,
  },
  other: 0,
  income: 0,
};

const IncomeReducer = (
  state: IncomeState = initialState,
  action: IncomeType
) => {
  return state;
};

export default IncomeReducer;
