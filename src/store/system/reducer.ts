import { SystemState, SystemType } from "./types";

const initialState: SystemState = {
  weeks: 365 / 7,
  fortnights: 365 / 14,
};

const SystemReducer = (
  state = initialState,
  action: SystemType
): SystemState => {
  return state;
};

export default SystemReducer;
