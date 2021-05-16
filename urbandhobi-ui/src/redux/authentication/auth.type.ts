export interface AuthAction {
  type: AuthActionType;
  payload?: any;
}

// eslint-disable-next-line no-shadow
export enum AuthActionType {
  SIGN_IN = "@@auth/SIGN_IN",
  RESET = "@@auth/RESET",
  SET_VERIFIED = "@@auth/SET_VERIFIED",
}

export interface AuthState {
  authenticated: boolean;
  verified: boolean | null;
}
