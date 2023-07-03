import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Card, Col, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UserInfoDiv from "./UserInfoDiv";

const UserCard = () => {
  const { userInfo } = useContext(UserContext);
  const { fullName, Id } = userInfo;
  return (
    <Col span={12}>
      <Card
        title="User info"
        bordered={true}
        style={{ marginTop: "16px", height: "100%"}}
      >
        <Avatar
          className="user-info-avatar"
          size={100}
          icon={<UserOutlined />}
        />
        <Space className="user-info-space">
          <UserInfoDiv info="Name" value={fullName} />
          <UserInfoDiv info="ID" value={Id} />
           {/* <UserInfoDiv info="Rate" value={`$${Rate.toFixed(2)}`} /> */}
        </Space>
      </Card>
    </Col>
  );
};

export default UserCard;
