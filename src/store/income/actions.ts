import {
  IncomeType,
  ADD_TAX_ITEM,
  TaxLine,
  REMOVE_TAX_ITEM,
  UPDATE_TAX_ITEM,
  UPDATE_INCOME,
} from "./types";

export const updateTaxItem = (item: TaxLine, index: number): IncomeType => {
  return { type: UPDATE_TAX_ITEM, item, index };
};

export const removeTaxItem = (index: number): IncomeType => {
  return { type: REMOVE_TAX_ITEM, index };
};

export const addTaxItem = (item: TaxLine): IncomeType => {
  return { type: ADD_TAX_ITEM, item };
};

export const updateIncome = (income: number): IncomeType => {
  return { type: UPDATE_INCOME, income };
};
