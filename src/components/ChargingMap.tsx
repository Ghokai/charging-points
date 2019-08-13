import { Alert } from "antd";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChargingPoint } from "src/store/models/chargingPoint";
import styled from "styled-components";
import { GOOGLE_MAP_KEY } from "../constants";
import { AppState } from "../store";
import { fetchChargingPoints } from "../store/actions/chargingPointsActions";
import ChargingPointDetails from "./ChargingPointDetails";
import Loader from "./Loader";
import MapMarker from "./MapMarker";

const ChargingMapWrapper = styled.div`
  width: 100%;
  .cp-details: {
    width: 100%;
  }
  .title {
    text-align: center;
    text-decoration: underline;
  }
`;

const mapSettings = {
  zoom: 5
};

const ChargingMap: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { chargingPoints, error, hasError, isLoading } = useSelector(
    (state: AppState) => state.chargingPoints
  );

  const [selectedPoint, setSelectedPoint] = useState(null);

  useEffect(() => {
    if (!isLoading && chargingPoints.length == 0) {
      dispatch(fetchChargingPoints());
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  if (hasError) {
    return <Alert type="error" message={error} />;
  }

  const renderMarkers = (chargingPoints: ChargingPoint[]) =>
    chargingPoints.map((cp: ChargingPoint) => (
      <MapMarker
        key={cp.id}
        lat={cp.lat}
        lng={cp.lng}
        point={cp}
        onClick={(point: ChargingPoint) => {
          setSelectedPoint(point);
        }}
      />
    ));

  if (chargingPoints.length === 0) {
    return (
      <Alert
        type="warning"
        message="There is no charge points found to show!"
      />
    );
  }
  return (
    <ChargingMapWrapper>
      <div className="title">
        <h3>Click the charging points on map for details.</h3>
      </div>
      <div style={{ height: "50vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAP_KEY }}
          defaultCenter={{
            lat: chargingPoints[0].lat,
            lng: chargingPoints[0].lng
          }}
          defaultZoom={mapSettings.zoom}
        >
          {...renderMarkers(chargingPoints)}
        </GoogleMapReact>
      </div>
      <div className="cp-details">
        {selectedPoint && (
          <ChargingPointDetails chargingPoint={selectedPoint} />
        )}
      </div>
    </ChargingMapWrapper>
  );
};

export default ChargingMap;
