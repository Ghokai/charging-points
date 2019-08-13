import { Card, Descriptions } from "antd";
import React from "react";
import { UserData } from "src/store/models/userData";

interface UserDetailsProps {
  userData: UserData;
}

const UserDetails: React.FC<UserDetailsProps> = (
  props: UserDetailsProps
): React.ReactElement => {
  const { userData } = props;

  return (
    <Card title="User Informations" style={{ width: "100%" }}>
      <Descriptions>
        <Descriptions.Item label="Id">{userData.id}</Descriptions.Item>
        <Descriptions.Item label="External Id">
          {userData.externalId}
        </Descriptions.Item>
        <Descriptions.Item label="First Name">
          {userData.firstName}
        </Descriptions.Item>
        <Descriptions.Item label="Last Name">
          {userData.lastName}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{userData.email}</Descriptions.Item>
        <Descriptions.Item label="Country">
          {`${userData.country} - ${userData.countryCode}`}
        </Descriptions.Item>
        <Descriptions.Item label="Status">{userData.status}</Descriptions.Item>
        <Descriptions.Item label="Locale">{userData.locale}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default UserDetails;
