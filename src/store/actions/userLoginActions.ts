import axios from "axios";
import { Dispatch } from "redux";
import {
  ACCESS_TOKEN_BASIC_AUTHORIZATION_TOKEN,
  ACCESS_TOKEN_END_POINT,
  USER_TOKEN_LOCAL_STORAGE_KEY
} from "../../constants";
import history from "../../history";
import { UserToken } from "../models/userToken";
import {
  USER_LOGIN_FAIL_ACTION,
  USER_LOGIN_FAIL_ACTION_TYPE,
  USER_LOGIN_LOADING_ACTION,
  USER_LOGIN_LOADING_ACTION_TYPE,
  USER_LOGIN_SUCCESS_ACTION,
  USER_LOGIN_SUCCESS_ACTION_TYPE,
  USER_LOGOUT_ACTION,
  USER_LOGOUT_ACTION_TYPE
} from "./actionTypes";
import { fetchUserData } from "./userDataActions";

export const logoutUser = (): USER_LOGOUT_ACTION => {
  localStorage.setItem(USER_TOKEN_LOCAL_STORAGE_KEY, null);

  const action: USER_LOGOUT_ACTION = {
    type: USER_LOGOUT_ACTION_TYPE
  };

  return action;
};

const getToken = (): UserToken => {
  try {
    const userTokenStr = localStorage.getItem(USER_TOKEN_LOCAL_STORAGE_KEY);
    if (userTokenStr) {
      const userTokenObj: UserToken = JSON.parse(userTokenStr);
      return userTokenObj;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const hasToken = (): boolean => {
  return !!getToken();
};

export const initUserToken = () => async (dispatch: Dispatch) => {
  const loadingAction: USER_LOGIN_LOADING_ACTION = {
    type: USER_LOGIN_LOADING_ACTION_TYPE
  };

  dispatch(loadingAction);

  const userTokenObj: UserToken = getToken();
  if (userTokenObj) {
    const action: USER_LOGIN_SUCCESS_ACTION = {
      type: USER_LOGIN_SUCCESS_ACTION_TYPE,
      payload: userTokenObj
    };

    dispatch(action);

    dispatch<any>(fetchUserData(userTokenObj.accessToken));
  } else {
    dispatch(logoutUser());
  }
};

export const loginUser = (username: string, password: string) => async (
  dispatch: Dispatch
) => {
  const loadingAction: USER_LOGIN_LOADING_ACTION = {
    type: USER_LOGIN_LOADING_ACTION_TYPE
  };

  dispatch(loadingAction);

  try {
    const response = await axios.post(
      ACCESS_TOKEN_END_POINT,
      {
        username,
        password,
        grant_type: "password"
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN_BASIC_AUTHORIZATION_TOKEN
        }
      }
    );

    const {
      access_token,
      expires_in,
      refresh_token,
      token_type
    } = response.data;

    const userToken: UserToken = {
      accessToken: access_token,
      expireIn: expires_in,
      refreshToken: refresh_token,
      tokenType: token_type
    };

    localStorage.setItem(
      USER_TOKEN_LOCAL_STORAGE_KEY,
      JSON.stringify(userToken)
    );

    const successAction: USER_LOGIN_SUCCESS_ACTION = {
      type: USER_LOGIN_SUCCESS_ACTION_TYPE,
      payload: userToken
    };

    dispatch(successAction);
    dispatch<any>(fetchUserData(userToken.accessToken));
    history.push("/map");
  } catch (error) {
    if (error.response) {
      const errorAction: USER_LOGIN_FAIL_ACTION = {
        type: USER_LOGIN_FAIL_ACTION_TYPE,
        payload: error.response.data.error_description
      };
      dispatch(errorAction);
    } else {
      const errorAction: USER_LOGIN_FAIL_ACTION = {
        type: USER_LOGIN_FAIL_ACTION_TYPE,
        payload: "Network Error!"
      };
      dispatch(errorAction);
    }
  }
};
