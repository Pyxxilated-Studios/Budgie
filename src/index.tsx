import React, { StrictMode } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store from "./store";

import App from "./App";

render(
  <StrictMode>
    <Provider store={store.store}>
      <PersistGate persistor={store.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
