import { Card, Col, Row, Statistic, Tabs } from "antd";
import React from "react";
import {
  ChargeConnector,
  ChargePower,
  ChargePrice,
  ChargingPoint
} from "src/store/models/chargingPoint";
import styled from "styled-components";

const ChargingPointWrapper = styled.div`
  background-color: #ececec;
  padding: 10px;
`;

const { TabPane } = Tabs;

interface ChargingPointDetailsProps {
  chargingPoint: ChargingPoint;
}

const ChargingPointDetails: React.FC<ChargingPointDetailsProps> = (
  props: ChargingPointDetailsProps
): React.ReactElement => {
  const cp = props.chargingPoint;

  const renderConnector = (connector: ChargeConnector) => (
    <Card
      key={connector.id}
      type="inner"
      title={`${connector.connectorType} - ${connector.id}`}
    >
      <Tabs defaultActiveKey={`tabs-${connector.id}`}>
        {renderPowerTab(connector.power)}
        {connector.price && renderPriceTab(connector.price)}
      </Tabs>
    </Card>
  );

  const renderPowerTab = (power: ChargePower) => (
    <TabPane tab="Power" key="1">
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Current" value={power.current} />
        </Col>
        <Col span={12}>
          <Statistic title="Voltage" value={power.voltage} />
        </Col>
        <Col span={12}>
          <Statistic title="Amperage" value={power.amperage} />
        </Col>
        {power.phase && (
          <Col span={12}>
            <Statistic title="Phase" value={power.phase} />
          </Col>
        )}
      </Row>
    </TabPane>
  );

  const renderPriceTab = (price: ChargePrice) => (
    <TabPane tab="Price" key="2">
      <Row gutter={16}>
        {price.currency !== undefined && (
          <Col span={12}>
            <Statistic title="Currency" value={price.currency} />
          </Col>
        )}
        {price.perSession !== undefined && (
          <Col span={12}>
            <Statistic
              precision={2}
              title="Per Session"
              value={price.perSession}
            />
          </Col>
        )}
        {price.perMinute !== undefined && (
          <Col span={12}>
            <Statistic
              precision={2}
              title="Per Minute"
              value={price.perMinute}
            />
          </Col>
        )}
        {price.perKWh !== undefined && (
          <Col span={12}>
            <Statistic precision={4} title="Per KWh" value={price.perKWh} />
          </Col>
        )}
      </Row>
    </TabPane>
  );

  return (
    <ChargingPointWrapper>
      <Card
        title={`${cp.id} - ${cp.city} - ${cp.address}`}
        bordered={false}
        style={{ width: "100%" }}
      >
        <p
          style={{
            fontSize: 14,
            color: "rgba(0, 0, 0, 0.85)",
            marginBottom: 16,
            fontWeight: 500
          }}
        >
          Connectors
        </p>
        {cp.connectors.map(connector => renderConnector(connector))}
      </Card>
    </ChargingPointWrapper>
  );
};

export default ChargingPointDetails;
