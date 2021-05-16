import { WidgetsAction, WidgetsActionType } from "./widgets.type";

export const CloseDrawer = (): WidgetsAction => {
  return {
    type: WidgetsActionType.CLOSE_DRAWER,
  };
};

export const OpenDrawer = (): WidgetsAction => {
  return {
    type: WidgetsActionType.OPEN_DRAWER,
  };
};
