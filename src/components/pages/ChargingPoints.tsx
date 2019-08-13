import * as React from "react";
import ChargingMap from "../ChargingMap";
import AuthorizedHOC from "./AuthorizedHOC";
import { PageContentWrapper } from "./PageStyles";

const ChargingPoints: React.FC = (): React.ReactElement => {
  return (
    <PageContentWrapper>
      <ChargingMap />
    </PageContentWrapper>
  );
};

export default AuthorizedHOC(ChargingPoints);
