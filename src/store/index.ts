import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { ChargingPointsReducer } from "./reducers/chargingPointsReducer";
import { TokenReducer } from "./reducers/tokenReducer";
import { UserReducer } from "./reducers/userReducer";

export const rootReducer = combineReducers({
  token: TokenReducer,
  user: UserReducer,
  chargingPoints: ChargingPointsReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
