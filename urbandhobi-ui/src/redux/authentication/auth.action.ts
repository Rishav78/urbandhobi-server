import { AuthActionType, AuthAction } from "./auth.type";

export type SignIn = () => AuthAction;
export type ResetAuth = () => AuthAction;
export type SetVerified = (payload: boolean) => AuthAction;

export const signIn: SignIn = () => {
  return {
    type: AuthActionType.SIGN_IN,
  };
};

export const resetAuth: ResetAuth = () => {
  return {
    type: AuthActionType.RESET,
  };
};

export const setVerified: SetVerified = (payload) => {
  return {
    type: AuthActionType.SET_VERIFIED,
    payload,
  };
};
