import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import LoginForm from "../LoginForm";
import { PageContentWrapper } from "./PageStyles";

const Login: React.FC = (props: any): React.ReactElement => {
  const { userToken } = useSelector((state: AppState) => state.token);

  useEffect(() => {
    if (userToken) {
      props.history.push("/");
    }
  }, []);

  return (
    <PageContentWrapper>
      <LoginForm />
    </PageContentWrapper>
  );
};

export default Login;
