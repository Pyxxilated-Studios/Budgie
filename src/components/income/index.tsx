import React from "react";
import { connect } from "react-redux";

import Tax from "./deductibles/tax";
import Other from "./deductibles/other";

const Income = () => {
  return (
    <div>
      <Tax />
      <Other />
    </div>
  );
};

export default connect()(Income);
