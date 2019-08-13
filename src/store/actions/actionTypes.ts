import { ChargingPoint } from "../models/chargingPoint";
import { UserData } from "../models/userData";
import { UserToken } from "../models/userToken";

export const USER_LOGIN_LOADING_ACTION_TYPE = "USER_LOGIN_LOADING";
export const USER_LOGIN_FAIL_ACTION_TYPE = "USER_LOGIN_FAIL";
export const USER_LOGIN_SUCCESS_ACTION_TYPE = "USER_LOGIN_SUCCESS";

export const USER_LOGOUT_ACTION_TYPE = "USER_LOGOUT";

export const USER_DATA_LOADING_ACTION_TYPE = "USER_DATA_LOADING";
export const USER_DATA_FAIL_ACTION_TYPE = "USER_DATA_FAIL";
export const USER_DATA_SUCCESS_ACTION_TYPE = "USER_DATA_SUCCESS";

export const CHARGING_POINTS_LOADING_ACTION_TYPE = "CHARGING_POINTS_LOADING";
export const CHARGING_POINTS_FAIL_ACTION_TYPE = "CHARGING_POINTS_FAIL";
export const CHARGING_POINTS_SUCCESS_ACTION_TYPE = "CHARGING_POINTS_SUCCESS";

export interface USER_LOGOUT_ACTION {
  type: string;
}

export interface USER_LOGIN_LOADING_ACTION {
  type: string;
}
export interface USER_LOGIN_FAIL_ACTION {
  type: string;
  payload: string;
}
export interface USER_LOGIN_SUCCESS_ACTION {
  type: string;
  payload: UserToken;
}

export interface USER_DATA_LOADING_ACTION {
  type: string;
}
export interface USER_DATA_FAIL_ACTION {
  type: string;
  payload: string;
}
export interface USER_DATA_SUCCESS_ACTION {
  type: string;
  payload: UserData;
}

export interface CHARGING_POINTS_LOADING_ACTION {
  type: string;
}
export interface CHARGING_POINTS_FAIL_ACTION {
  type: string;
  payload: string;
}
export interface CHARGING_POINTS_SUCCESS_ACTION {
  type: string;
  payload: ChargingPoint[];
}
