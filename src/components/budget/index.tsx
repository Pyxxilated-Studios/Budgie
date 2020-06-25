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
import { BudgetState } from "../../store/budget/types";
import { addBudgetItem, deleteBudgetItem } from "../../store/budget/actions";

import Item from "./budget-item";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    },
    addButton: {
      display: "table",
      margin: "0 auto",
      padding: theme.spacing(1),
    },
  })
);

type StateProps = {
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
      <Grid container>
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

      <Grid container item>
        <Card variant="outlined">
          <CardContent>
            <Typography>Total</Typography>
            <Typography variant="h5" component="h2">
              $
              {props.budget.total.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  budget: state.budget,
});

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
  addBudgetItem: (): void => dispatch(addBudgetItem()),
  deleteBudgetItem: (idx: number): void => dispatch(deleteBudgetItem(idx)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
