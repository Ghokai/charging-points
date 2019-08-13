import {
  USER_DATA_FAIL_ACTION_TYPE,
  USER_DATA_LOADING_ACTION_TYPE,
  USER_DATA_SUCCESS_ACTION_TYPE,
  USER_LOGOUT_ACTION_TYPE
} from "../actions/actionTypes";
import { UserData } from "../models/userData";

interface IUserReducerState {
  userData: UserData;
  isLoading: boolean;
  error: string;
  hasError: boolean;
}

const defaultUserReducerState: IUserReducerState = {
  userData: null,
  isLoading: false,
  error: "",
  hasError: false
};

export const UserReducer = (
  state: IUserReducerState = defaultUserReducerState,
  action: any
): IUserReducerState => {
  switch (action.type) {
    case USER_DATA_LOADING_ACTION_TYPE:
      return { ...state, isLoading: true, hasError: false, error: "" };

    case USER_DATA_SUCCESS_ACTION_TYPE:
      return { ...state, isLoading: false, userData: action.payload };

    case USER_DATA_FAIL_ACTION_TYPE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload
      };
    case USER_LOGOUT_ACTION_TYPE:
      return defaultUserReducerState;
    default:
      return state;
  }
};
