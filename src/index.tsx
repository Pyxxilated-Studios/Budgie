import React, { StrictMode } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import store from "./store";

import App from "./App";

const primaryText = "#f0ad6d";
const secondaryText = "#ffcd8b";
const backgroundColour = "#1a1423";
const secondaryBackgroundColour = "#3d314a";

const theme = responsiveFontSizes(
  createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        "@global": {
          body: {
            background: `linear-gradient(
            135deg,
            ${secondaryBackgroundColour} 21px,
            ${backgroundColour} 22px,
            ${backgroundColour} 24px,
            transparent 24px,
            transparent 67px,
            ${backgroundColour} 67px,
            ${backgroundColour} 69px,
            transparent 69px
          ),
          linear-gradient(
              225deg,
              ${secondaryBackgroundColour} 21px,
            ${backgroundColour} 22px,
            ${backgroundColour} 24px,
            transparent 24px,
            transparent 67px,
            ${backgroundColour} 67px,
            ${backgroundColour} 69px,
            transparent 69px
            )
            0 64px`,
            backgroundColor: secondaryBackgroundColour,
            backgroundSize: "64px 128px",
          },
        },
      },
      MuiFormLabel: {
        root: {
          color: primaryText,
        },
      },
      MuiInputBase: {
        root: {
          color: primaryText,
        },
      },
      MuiTypography: {
        colorTextSecondary: {
          color: secondaryText,
        },
      },
      MuiSelect: { icon: { color: secondaryText } },
      MuiListItemIcon: {
        root: {
          color: secondaryText,
        },
      },
      MuiPaper: {
        root: {
          color: primaryText,
        },
      },
    },
    palette: {
      primary: {
        main: primaryText,
      },
      secondary: {
        main: secondaryText,
      },
      background: {
        paper: backgroundColour,
        default: secondaryBackgroundColour,
      },
    },
  })
);

render(
  <StrictMode>
    <Provider store={store.store}>
      <PersistGate persistor={store.persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
