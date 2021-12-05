import React, { forwardRef } from "react";
import { connect } from "react-redux";

import MaterialTable, { Icons } from "@material-table/core";

import AddBox from "@material-ui/icons/AddBox";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";

import { IncomeState, TaxLine } from "../../../../store/income/types";
import { RootState, RootDispatch } from "../../../../store";
import {
  addTaxItem,
  updateTaxItem,
  removeTaxItem,
} from "../../../../store/income/actions";

type StateProps = {
  income: IncomeState;
};

type DispatchProps = {
  addTaxItem: (item: TaxLine) => void;
  removeTaxItem: (index: number) => void;
  updateTaxItem: (item: TaxLine, index: number) => void;
};

type TaxProps = StateProps & DispatchProps;

const columns = [
  {
    title: "Lower Bracket",
    field: "lower",
  },
  {
    title: "Upper Bracket",
    field: "upper",
  },
  {
    title: "Percentage",
    field: "percentage",
  },
];

/* eslint-disable */
const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
};
/* eslint-enable */

const Tax = (props: TaxProps) => {
  return (
    <MaterialTable
      style={{ padding: "0 2em 2em" }}
      title="Tax"
      icons={{ ...tableIcons }}
      columns={columns}
      data={props.income.deductibles.taxes}
      options={{
        search: false,
        paginationType: undefined,
        paging: undefined,
      }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            props.addTaxItem({
              upper: Number(newData.upper) || 0,
              lower: Number(newData.lower) || 0,
              percentage: Number(newData.percentage) || 0,
            });
            resolve(null);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            const data = oldData as TaxLine & {
              tableData: { id: number };
            };
            props.updateTaxItem(
              {
                upper: Number(newData.upper) || 0,
                lower: Number(newData.lower) || 0,
                percentage: Number(newData.percentage) || 0,
              },
              data.tableData.id
            );
            resolve(null);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            const data = oldData as TaxLine & {
              tableData: { id: number };
            };
            props.removeTaxItem(data.tableData.id);
            resolve(null);
          }),
      }}
    />
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  income: state.income,
});

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
  addTaxItem: (item: TaxLine) => dispatch(addTaxItem(item)),
  removeTaxItem: (index: number) => dispatch(removeTaxItem(index)),
  updateTaxItem: (item: TaxLine, index: number) =>
    dispatch(updateTaxItem(item, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tax);
