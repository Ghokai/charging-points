import {
  USER_LOGIN_FAIL_ACTION_TYPE,
  USER_LOGIN_LOADING_ACTION_TYPE,
  USER_LOGIN_SUCCESS_ACTION_TYPE,
  USER_LOGOUT_ACTION_TYPE
} from "../actions/actionTypes";
import { UserToken } from "../models/userToken";

interface ITokenReducerState {
  userToken: UserToken;
  isLoading: boolean;
  error: string;
  hasError: boolean;
}

const defaultTokenReducerState: ITokenReducerState = {
  userToken: null,
  isLoading: false,
  error: "",
  hasError: false
};

export const TokenReducer = (
  state: ITokenReducerState = defaultTokenReducerState,
  action: any
): ITokenReducerState => {
  switch (action.type) {
    case USER_LOGIN_LOADING_ACTION_TYPE:
      return { ...state, isLoading: true, hasError: false, error: "" };

    case USER_LOGIN_SUCCESS_ACTION_TYPE:
      return { ...state, isLoading: false, userToken: action.payload };

    case USER_LOGIN_FAIL_ACTION_TYPE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload
      };
    case USER_LOGOUT_ACTION_TYPE:
      return defaultTokenReducerState;
    default:
      return state;
  }
};
