import { Button, Icon, Result } from "antd";
import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import Loader from "../Loader";
import UserDetails from "../UserDetails";
import { PageContentWrapper } from "./PageStyles";

const Welcome: React.FC = (props: any): React.ReactElement => {
  const { userData, isLoading } = useSelector((state: AppState) => state.user);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PageContentWrapper>
      <Result
        icon={<Icon type="smile" theme="twoTone" />}
        title={`Hello ${
          userData ? userData.firstName + " " + userData.lastName : "Stranger"
        }, Welcome to Charging Points Application!`}
        status="info"
        extra={
          <Button onClick={() => props.history.push("/map")} type="primary">
            Go to Map
          </Button>
        }
      >
        {userData && <UserDetails userData={userData} />}
      </Result>
    </PageContentWrapper>
  );
};

export default Welcome;
