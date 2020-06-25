import * as React from "react";
import { connect } from "react-redux";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { RootState, RootDispatch } from "../../store";
import { BudgetState, BudgetItem, Frequency } from "../../store/budget/types";
import { addBudgetItem, deleteBudgetItem } from "../../store/budget/actions";

import Item from "./budget-item";
import { SystemState } from "../../store/system/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    item: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      maxWidth: 700,
    },
    addButton: {
      display: "table",
      margin: "0 auto",
      padding: theme.spacing(1),
    },
    total: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    },
  })
);

type StateProps = {
  system: SystemState;
  budget: BudgetState;
};

type DispatchProps = {
  addBudgetItem: () => void;
  deleteBudgetItem: (idx: number) => void;
};

type BudgetProps = StateProps & DispatchProps;

const Budget = (props: BudgetProps) => {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.container}>
        <Grid container item className={classes.total}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                Total:{" "}
                {`$${(
                  calculateTotal(props.budget.budget, props.system) || 0
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {props.budget.budget.map((item, index) => (
          <Grid container item className={classes.item} key={item.id}>
            <Grid item xs={11}>
              <Item
                key={item.id}
                index={index}
                item={item}
                onDeletePress={props.deleteBudgetItem}
              />
            </Grid>
          </Grid>
        ))}
      </Grid>

      <span className={classes.addButton}>
        <IconButton
          aria-label="add budget item"
          color="primary"
          onClick={props.addBudgetItem}
        >
          <AddIcon />
        </IconButton>
      </span>
    </>
  );
};

const calculateTotal = (
  budgetItems: BudgetItem[],
  state: SystemState
): number =>
  budgetItems.reduce(
    (total, item) =>
      total + convertToYearly(Number(item.amount) || 0, item.frequency, state),
    0
  );

const convertToYearly = (
  amount: number,
  frequency: Frequency,
  state: SystemState
): number => {
  switch (frequency) {
    case Frequency.Weekly:
      return amount * state.weeks;
    case Frequency.Fortnightly:
      return amount * state.fortnights;
    case Frequency.Monthly:
      return amount * 12;
    case Frequency.Yearly:
      return amount;
  }
};

const mapStateToProps = (state: RootState): StateProps => ({
  system: state.system,
  budget: state.budget,
});

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
  addBudgetItem: (): void => dispatch(addBudgetItem()),
  deleteBudgetItem: (idx: number): void => dispatch(deleteBudgetItem(idx)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
