import * as React from "react";
import { Route } from "react-router-dom";
import ChargingPoints from "./ChargingPoints";
import Login from "./Login";
import Welcome from "./Welcome";

const Routes: React.FC = (): React.ReactElement => {
  return (
    <>
      <Route path="/" exact component={Welcome} />
      <Route path="/login" component={Login} />
      <Route path="/map" component={ChargingPoints} />
    </>
  );
};

export default Routes;
