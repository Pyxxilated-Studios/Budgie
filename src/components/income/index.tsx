import React from "react";
import { connect } from "react-redux";

import Tax from "./deductibles/tax";
import OtherDeductible from "./deductibles/other";

const Income = () => {
  return (
    <div>
      <Tax />
      <OtherDeductible />
    </div>
  );
};

export default connect()(Income);
