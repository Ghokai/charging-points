import { Spin } from "antd";
import React from "react";
import styled from "styled-components";

const SpinnerWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const Loader: React.FC = (): React.ReactElement => {
  return (
    <SpinnerWrapper>
      <Spin />
    </SpinnerWrapper>
  );
};

export default Loader;
