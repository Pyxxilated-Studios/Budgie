import React from "react";
import { connect } from "react-redux";

import MaterialTable from "material-table";

import { IncomeState } from "../../../../store/income/types";
import { RootState } from "../../../../store";

type StateProps = {
  income: IncomeState;
};

type TaxProps = StateProps;

const Tax = (props: TaxProps) => {
  return (
    <div>
      {props.income.deductibles.taxes.map((tax) => (
        <div>
          <span>{tax.range}</span>
          <span>{tax.percentage}</span>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  income: state.income,
});

export default connect(mapStateToProps)(Tax);
