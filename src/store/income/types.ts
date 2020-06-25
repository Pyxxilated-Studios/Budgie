export interface TaxLine {
  range: [number, number];
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

export type IncomeType = undefined;
