import { SystemState, SwitchDialogType } from "./types";

const initialState: SystemState = {};

export default function BudgetReducer(
  state = initialState,
  action: SwitchDialogType
): SystemState {
  return state;
}
