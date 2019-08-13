import {
  CHARGING_POINTS_FAIL_ACTION_TYPE,
  CHARGING_POINTS_LOADING_ACTION_TYPE,
  CHARGING_POINTS_SUCCESS_ACTION_TYPE,
  USER_LOGOUT_ACTION_TYPE
} from "../actions/actionTypes";
import { ChargingPoint } from "../models/chargingPoint";

interface IChargingPointsReducer {
  chargingPoints: ChargingPoint[];
  isLoading: boolean;
  error: string;
  hasError: boolean;
}

const defaultChargingPointsReducer: IChargingPointsReducer = {
  chargingPoints: [],
  isLoading: false,
  error: "",
  hasError: false
};

export const ChargingPointsReducer = (
  state: IChargingPointsReducer = defaultChargingPointsReducer,
  action: any
): IChargingPointsReducer => {
  switch (action.type) {
    case CHARGING_POINTS_LOADING_ACTION_TYPE:
      return { ...state, isLoading: true, hasError: false, error: "" };

    case CHARGING_POINTS_SUCCESS_ACTION_TYPE:
      return { ...state, isLoading: false, chargingPoints: action.payload };

    case CHARGING_POINTS_FAIL_ACTION_TYPE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload
      };
    case USER_LOGOUT_ACTION_TYPE:
      return defaultChargingPointsReducer;
    default:
      return state;
  }
};
