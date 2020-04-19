export interface SystemState {
  budget: boolean;
}

export const SWITCH_DIALOG = "SWITCH_DIALOG";

export interface SystemPayload {
  budget: boolean;
}

interface SwitchDialogAction {
  type: typeof SWITCH_DIALOG;
  payload: SystemPayload;
}

export type SwitchDialogType = SwitchDialogAction;
