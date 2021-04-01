import { SystemState, SystemType } from "./types";

const initialState: SystemState = {
  weeks: 365 / 7,
  fortnights: 365 / 14,
  hours: 37.5,
};

const SystemReducer = (
  state = initialState,
  action: SystemType
): SystemState => {
  if (action) return state;
  return state;
};

export default SystemReducer;
