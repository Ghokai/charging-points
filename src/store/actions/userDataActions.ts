import axios from "axios";
import { Dispatch } from "redux";
import { USER_INFO_END_POINT } from "../../constants";
import {
  USER_DATA_FAIL_ACTION,
  USER_DATA_FAIL_ACTION_TYPE,
  USER_DATA_LOADING_ACTION,
  USER_DATA_LOADING_ACTION_TYPE,
  USER_DATA_SUCCESS_ACTION,
  USER_DATA_SUCCESS_ACTION_TYPE
} from "./actionTypes";
import { logoutUser } from "./userLoginActions";

export const fetchUserData = (token: string) => async (dispatch: Dispatch) => {
  const loadingAction: USER_DATA_LOADING_ACTION = {
    type: USER_DATA_LOADING_ACTION_TYPE
  };

  dispatch(loadingAction);

  try {
    const response = await axios.get(USER_INFO_END_POINT, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const successAction: USER_DATA_SUCCESS_ACTION = {
      type: USER_DATA_SUCCESS_ACTION_TYPE,
      payload: response.data
    };

    dispatch(successAction);
  } catch (error) {
    if (!error.response) {
      const errorAction: USER_DATA_FAIL_ACTION = {
        type: USER_DATA_FAIL_ACTION_TYPE,
        payload: "Network Error!"
      };
      dispatch(errorAction);
    } else if (error.response.status === 401) {
      //token expired cleare local storage & state
      dispatch(logoutUser());
    } else {
      const errorAction: USER_DATA_FAIL_ACTION = {
        type: USER_DATA_FAIL_ACTION_TYPE,
        payload: error.response.data.error_description
      };
      dispatch(errorAction);
    }
  }
};
