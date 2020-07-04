export interface TaxLine {
  lower: number;
  upper: number;
  percentage: number;
}

export interface IncomeState {
  deductibles: {
    taxes: TaxLine[];
    other: number;
  };
  income: number;
  other: number;
}

export const ADD_TAX_ITEM = "ADD_TAX_ITEM";
interface AddTaxItemAction {
  type: typeof ADD_TAX_ITEM;
  item: TaxLine;
}

export const REMOVE_TAX_ITEM = "REMOVE_TAX_ITEM";
interface RemoveTaxItemAction {
  type: typeof REMOVE_TAX_ITEM;
  index: number;
}

export const UPDATE_TAX_ITEM = "UPDATE_TAX_ITEM";
interface UpdateTaxItemAction {
  type: typeof UPDATE_TAX_ITEM;
  item: TaxLine;
  index: number;
}

export const UPDATE_INCOME = "UPDATE_INCOME";
interface UpdateIncomeAction {
  type: typeof UPDATE_INCOME;
  income: number;
}

export type IncomeType =
  | AddTaxItemAction
  | RemoveTaxItemAction
  | UpdateTaxItemAction
  | UpdateIncomeAction;
