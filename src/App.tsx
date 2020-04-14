import * as React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Item from "./components/item";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import uniqueId from "lodash/uniqueId";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      padding: theme.spacing(1),
    },
    item: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    },
    itemButton: {
      display: "inline",
      float: "right",
    },
  })
);

interface BudgetItem {
  item: React.ReactNode;
  id: string;
}

interface AppState {
  items: BudgetItem[];
}

export default function App() {
  const [state, setState] = React.useState<AppState>({ items: [] });
  const classes = useStyles();

  return (
    <Container>
      <Paper elevation={1} className={classes.root}>
        <Grid container>
          {state.items.map((item, index) => (
            <Grid container item className={classes.item} key={item.id}>
              <Grid item xs={11}>
                {item.item}
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  aria-label="delete"
                  color="secondary"
                  onClick={() => {
                    state.items.splice(index, 1);
                    setState({
                      ...state,
                    });
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <IconButton
          aria-label="add budget item"
          color="primary"
          onClick={() => {
            state.items.push({ item: <Item />, id: uniqueId() });
            setState({
              ...state,
            });
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Paper>
    </Container>
  );
}
