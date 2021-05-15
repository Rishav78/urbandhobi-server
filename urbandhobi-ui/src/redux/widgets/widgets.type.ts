export interface WidgetsAction {
  type: WidgetsActionType;
  payload?: any;
}

// eslint-disable-next-line no-shadow
export enum WidgetsActionType {
  OPEN_DRAWER = "@@widgets/OPEN_DRAWER",
  CLOSE_DRAWER = "@@widgets/CLOSE_DRAWER",
}

export interface WidgetsState {
  drawer: {
    open: boolean;
  };
}
