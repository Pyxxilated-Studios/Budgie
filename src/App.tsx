import * as React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import Budget from "./components/budget";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    content: {
      padding: theme.spacing(2),
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
    addButton: {
      display: "table",
      margin: "0 auto",
      padding: theme.spacing(1),
    },
  })
);

interface AppProps {}

export default function App() {
  const classes = useStyles();

  return (
    <Container>
      <main className={classes.root}>
        <Paper elevation={1} className={classes.content}>
          <Budget />
        </Paper>
      </main>
    </Container>
  );
}
