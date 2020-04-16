import {
  BudgetItemTypes,
  ADD_BUDGET_ITEM,
  DELETE_BUDGET_ITEM,
  UPDATE_BUDGET_ITEM,
  BudgetItem,
  Frequency,
} from "./types";

export function addBudgetItem(): BudgetItemTypes {
  return {
    type: ADD_BUDGET_ITEM,
  };
}

export function deleteBudgetItem(index: number): BudgetItemTypes {
  return {
    type: DELETE_BUDGET_ITEM,
    index: index,
  };
}

export function updateBudgetItem(
  index: number,
  property: keyof BudgetItem,
  value: string | Frequency
): BudgetItemTypes {
  return {
    type: UPDATE_BUDGET_ITEM,
    index: index,
    property: property,
    value: value,
  };
}
