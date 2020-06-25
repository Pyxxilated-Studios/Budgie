import { SystemState, SwitchDialogType } from "./types";

const initialState: SystemState = {
  weeks: 365 / 7,
  fortnights: 365 / 14,
};

export default function BudgetReducer(
  state = initialState,
  action: SwitchDialogType
): SystemState {
  return state;
}
