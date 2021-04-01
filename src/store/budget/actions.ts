import {
  BudgetItemType,
  ADD_BUDGET_ITEM,
  DELETE_BUDGET_ITEM,
  UPDATE_BUDGET_ITEM,
  BudgetItem,
  Frequency,
} from "./types";

export function addBudgetItem(): BudgetItemType {
  return {
    type: ADD_BUDGET_ITEM,
  };
}

export function deleteBudgetItem(index: number): BudgetItemType {
  return {
    type: DELETE_BUDGET_ITEM,
    index: index,
  };
}

export function updateBudgetItem(
  index: number,
  property: string,
  value: string | Frequency
): BudgetItemType {
  return {
    type: UPDATE_BUDGET_ITEM,
    index: index,
    property: property as keyof BudgetItem,
    value: value,
  };
}
