import {
  CloseDrawer,
  OpenDrawer,
} from "@urbandhobi/redux/widgets/widgets.action";
import { RootReducer } from "@urbandhobi/typings";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const openSelector = (state: RootReducer) => state.widgets.drawer.open;

export const useDrawer = () => {
  const isOpen = useSelector(openSelector);
  const dispatch = useDispatch();

  const open = useCallback(() => {
    dispatch(OpenDrawer());
  }, [dispatch]);

  const close = useCallback(() => {
    dispatch(CloseDrawer());
  }, [dispatch]);

  return {
    isOpen,
    open,
    close,
  };
};
