export interface TaxLine {
  range: [number, number];
  percentage: number;
}

export interface IncomeState {
  taxes: TaxLine[];
  income: number;
}
