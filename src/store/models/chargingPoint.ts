export interface ChargePower {
  current: string;
  phase?: number;
  voltage: number;
  amperage: number;
}

export interface ChargeConnector {
  id: number;
  connectorType: string;
  power: ChargePower;
  price?: ChargePrice;
}

export interface ChargePrice {
  perSession?: number;
  currency?: string;
  perMinute?: number;
  perKWh?: number;
}

export interface ChargingPoint {
  city: string;
  lng: number;
  connectors: ChargeConnector[];
  id: number;
  address: string;
  lat: number;
}
