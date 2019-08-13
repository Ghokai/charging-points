import React from "react";
import { ChargingPoint } from "src/store/models/chargingPoint";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${props => (props.onClick ? "pointer" : "default")};
  &:hover {
    z-index: 1;
  }
`;

interface MapMarkerProps {
  onClick?: (point: ChargingPoint) => void;
  lat: number;
  lng: number;
  point: ChargingPoint;
}

const MapMarker: React.FC<MapMarkerProps> = (
  props: MapMarkerProps
): React.ReactElement => {
  return (
    <Wrapper
      {...(props.onClick ? { onClick: () => props.onClick(props.point) } : {})}
    />
  );
};

export default MapMarker;
