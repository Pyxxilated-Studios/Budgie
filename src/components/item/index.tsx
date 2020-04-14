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

import uuid from "lodash/uniqueId";

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
    withoutLabel: {
      marginTop: theme.spacing(3),
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

enum Frequency {
  Weekly = "Weekly",
  Fortnightly = "Fortnightly",
  Monthly = "Monthly",
  Yearly = "Yearly",
}

interface BudgetItem {
  expense: string;
  amount: string;
  frequency: Frequency;
  id: string;
}

export default function Item() {
  const classes = useStyles();

  const [state, setState] = React.useState<BudgetItem>({
    expense: "",
    amount: "0.00",
    frequency: Frequency.Fortnightly,
    id: uuid(),
  });

  const handleChange = (prop: keyof BudgetItem) => (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setState({
      ...state,
      [prop]: event.target.value,
    });
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <TextField
          label="Expense"
          value={state.expense}
          onChange={handleChange("expense")}
          className={clsx(classes.margin, classes.textField)}
        />
        <TextField
          label="Amount"
          className={clsx(classes.margin, classes.textField)}
          value={state.amount}
          onChange={handleChange("amount")}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id={"frequency-label-" + state.id}>Frequency</InputLabel>
          <Select
            labelId={"frequency-label" + state.id}
            value={state.frequency}
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
}
