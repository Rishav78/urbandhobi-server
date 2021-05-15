import { signIn } from "@urbandhobi/redux/authentication/auth.action";
import { RootReducer } from "@urbandhobi/typings";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const authenticatedSelector = (state: RootReducer) => state.auth.authenticated;

export const useAuth = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(authenticatedSelector);

  const signin = useCallback(() => {
    dispatch(signIn());
  }, [dispatch]);

  return {
    authenticated,
    signin,
  };
};
