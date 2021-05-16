import { AuthAction, AuthActionType, AuthState } from "./auth.type";

const initialState: AuthState = {
  authenticated: false,
  verified: null,
};

export type AuthReducerFn = (state: AuthState, action: AuthAction) => AuthState;

export const AuthReducer: AuthReducerFn = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AuthActionType.SIGN_IN:
      return {
        ...state,
        authenticated: true,
      };
    case AuthActionType.SET_VERIFIED:
      return {
        ...state,
        verified: payload,
      };
    case AuthActionType.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
