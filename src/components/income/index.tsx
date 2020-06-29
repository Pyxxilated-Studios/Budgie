import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import InputLabel from "@material-ui/core/InputLabel";
import CardContent from "@material-ui/core/CardContent";

import { RootState, RootDispatch } from "../../store";
import { TaxLine, IncomeState } from "../../store/income/types";
import { SystemState } from "../../store/system/types";
import { updateIncome } from "../../store/income/actions";

import Tax from "./deductibles/tax";
import OtherDeductible from "./deductibles/other";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
}));

type StateProps = {
  system: SystemState;
  income: IncomeState;
};

type DispatchProps = {
  updateIncome: (income: number) => void;
};

type IncomeProps = StateProps & DispatchProps;

const Income = (props: IncomeProps) => {
  const classes = useStyles();

  const incomeAfterTax = calculateIncome(
    props.income.income,
    props.income.deductibles.taxes
  );

  const incomePeriods = getPeriodicIncome(incomeAfterTax, props.system);

  return (
    <div>
      <Tax />
      <OtherDeductible />
      <Card className={classes.root}>
        <CardContent>
          <InputLabel htmlFor="income-label">Income</InputLabel>
          <Input
            id="income-label"
            value={props.income.income}
            onChange={(event) =>
              props.updateIncome(Number(event.target.value) || 0)
            }
          />
          <Typography>Income After Tax </Typography>
          <Typography>
            $
            {incomeAfterTax.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
          {incomePeriods.map(({ period, amount }) => (
            <>
              <Typography>{period}</Typography>
              <Typography>
                $
                {amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

const calculateIncome = (income: number, deductions: TaxLine[]): number =>
  deductions.reduce((total, tax) => {
    if (income >= tax.lower) {
      const within =
        income <= tax.upper ? income - tax.lower : tax.upper - tax.lower;

      total -= within * (tax.percentage / 100);
    }

    return total;
  }, income);

const getPeriodicIncome = (
  income: number,
  system: SystemState
): { period: string; amount: number }[] => {
  const periods = [
    { period: "Annual", amount: income },
    { period: "Monthly", amount: income / 12 },
    { period: "Fortnightly", amount: income / system.fortnights },
    { period: "Weekly", amount: income / system.weeks },
    { period: "Hourly", amount: income / system.weeks / system.hours },
  ];

  return periods;
};

const mapStateToProps = (state: RootState): StateProps => ({
  system: state.system,
  income: state.income,
});

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
  updateIncome: (income: number): void => dispatch(updateIncome(income)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Income);
