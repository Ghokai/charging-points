import React from "react";
import { useSelector } from "react-redux";
import history from "../../history";
import { AppState } from "../../store";
import { hasToken } from "../../store/actions/userLoginActions";
import Loader from "../Loader";

const AuthorizedHOC = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: any) => {
    const { tokenLoading, userLoading } = useSelector((state: AppState) => ({
      tokenLoading: state.token.isLoading,
      userLoading: state.user.isLoading
    }));

    if (!hasToken()) {
      history.push("/login");
      return null;
    }
    if (tokenLoading || userLoading) {
      return <Loader />;
    }
    return <WrappedComponent {...props}></WrappedComponent>;
  };
};

export default AuthorizedHOC;
