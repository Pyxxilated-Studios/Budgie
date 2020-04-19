import { SWITCH_DIALOG, SwitchDialogType } from "./types";

export function switchDialog(budget: boolean): SwitchDialogType {
  return {
    type: SWITCH_DIALOG,
    payload: {
      budget: budget,
    },
  };
}
