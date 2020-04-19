import * as React from "react";
import clsx from "clsx";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";

import { BudgetItem, Frequency } from "../../store/budget/types";
import { updateBudgetItem } from "../../store/budget/actions";

import { connect } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
      "& > *": {
        margin: theme.spacing(1),
        width: "100%",
      },
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: "25ch",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

type ButtonProps = {
  index: number;
  item: BudgetItem;
  updateBudgetItem: typeof updateBudgetItem;
};

const Item = (props: ButtonProps) => {
  const classes = useStyles();

  const handleChange = (prop: keyof BudgetItem) => (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    props.updateBudgetItem(props.index, prop, String(event.target.value));
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <TextField
          label="Expense"
          value={props.item.expense}
          onChange={handleChange("expense")}
          className={clsx(classes.margin, classes.textField)}
        />
        <TextField
          label="Amount"
          value={props.item.amount}
          onChange={handleChange("amount")}
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id={"frequency-label-" + props.item.id}>
            Frequency
          </InputLabel>
          <Select
            labelId={"frequency-label" + props.item.id}
            value={props.item.frequency}
            onChange={handleChange("frequency")}
            inputProps={{
              name: "frequency",
              id: "frequency-native-simple",
            }}
          >
            <MenuItem value={Frequency.Weekly}>{Frequency.Weekly}</MenuItem>
            <MenuItem value={Frequency.Fortnightly}>
              {Frequency.Fortnightly}
            </MenuItem>
            <MenuItem value={Frequency.Monthly}>{Frequency.Monthly}</MenuItem>
            <MenuItem value={Frequency.Yearly}>{Frequency.Yearly}</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </div>
  );
};

export default connect(null, { updateBudgetItem })(Item);
