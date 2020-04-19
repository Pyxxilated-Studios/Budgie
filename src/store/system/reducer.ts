import { SystemState, SwitchDialogType, SWITCH_DIALOG } from "./types";

const initialState: SystemState = {
  budget: true,
};

export default function BudgetReducer(
  state = initialState,
  action: SwitchDialogType
): SystemState {
  switch (action.type) {
    case SWITCH_DIALOG:
      const { budget } = action.payload;
      return { ...state, budget: budget || false };

    default:
      return state;
  }
}
