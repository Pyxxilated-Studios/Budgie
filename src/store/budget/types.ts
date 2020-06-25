export enum Frequency {
  Weekly = "Weekly",
  Fortnightly = "Fortnightly",
  Monthly = "Monthly",
  Yearly = "Yearly",
}

export interface BudgetItem {
  expense: string;
  amount: string;
  frequency: Frequency;
  id: string;
}

export interface BudgetState {
  budget: BudgetItem[];
}

export const ADD_BUDGET_ITEM = "ADD_BUDGET_ITEM";
export const DELETE_BUDGET_ITEM = "DELETE_BUDGET_ITEM";
export const UPDATE_BUDGET_ITEM = "UPDATE_BUDGET_ITEM";

interface AddBudgetItemAction {
  type: typeof ADD_BUDGET_ITEM;
}

interface DeleteBudgetItemAction {
  type: typeof DELETE_BUDGET_ITEM;
  index: number;
}

interface UpdateBudgetItemAction {
  type: typeof UPDATE_BUDGET_ITEM;
  index: number;
  property: keyof BudgetItem;
  value: string | Frequency;
}

export type BudgetItemType =
  | AddBudgetItemAction
  | DeleteBudgetItemAction
  | UpdateBudgetItemAction;
