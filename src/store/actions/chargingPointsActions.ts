import { Dispatch } from "redux";
import { fetchChargePoints } from "../../api";
import {
  CHARGING_POINTS_FAIL_ACTION,
  CHARGING_POINTS_FAIL_ACTION_TYPE,
  CHARGING_POINTS_LOADING_ACTION,
  CHARGING_POINTS_LOADING_ACTION_TYPE,
  CHARGING_POINTS_SUCCESS_ACTION,
  CHARGING_POINTS_SUCCESS_ACTION_TYPE
} from "./actionTypes";

export const fetchChargingPoints = () => async (dispatch: Dispatch) => {
  const loadingAction: CHARGING_POINTS_LOADING_ACTION = {
    type: CHARGING_POINTS_LOADING_ACTION_TYPE
  };

  dispatch(loadingAction);

  try {
    const response = await fetchChargePoints();
    const successAction: CHARGING_POINTS_SUCCESS_ACTION = {
      type: CHARGING_POINTS_SUCCESS_ACTION_TYPE,
      payload: response
    };
    dispatch(successAction);
  } catch (error) {
    console.log(error.response.data);
    const errorAction: CHARGING_POINTS_FAIL_ACTION = {
      type: CHARGING_POINTS_FAIL_ACTION_TYPE,
      payload: error.response.data.error_description
    };
    dispatch(errorAction);
  }
};
