import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppState } from "../store";
import { initUserToken } from "../store/actions/userLoginActions";
import Header from "./Header";
import Routes from "./pages/routes";

const AppWrapper = styled.div`
  width: 80%;
  margin: auto;
  display: block;
  color: blue;
`;

const App: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { userToken, isLoading } = useSelector(
    (state: AppState) => state.token
  );

  useEffect(() => {
    if (!userToken && !isLoading) {
      dispatch(initUserToken());
    }
  }, []);

  return (
    <AppWrapper>
      <Header />
      <Routes />
    </AppWrapper>
  );
};

export default App;
