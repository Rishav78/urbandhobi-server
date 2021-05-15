import { WidgetsAction, WidgetsActionType, WidgetsState } from "./widgets.type";

const initialState: WidgetsState = {
  drawer: {
    open: false,
  },
};

export type WidgetsReducerFn = (
  state: WidgetsState,
  action: WidgetsAction
) => WidgetsState;

export const WidgetsReducer: WidgetsReducerFn = (
  state = initialState,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case WidgetsActionType.CLOSE_DRAWER:
      return {
        ...state,
        drawer: {
          ...state.drawer,
          open: false,
        },
      };
    case WidgetsActionType.OPEN_DRAWER:
      return {
        ...state,
        drawer: {
          ...state.drawer,
          open: true,
        },
      };
    default:
      return state;
  }
};
