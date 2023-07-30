import { useContext } from "react";
import { MessageContext } from "../Context/MessageContext";
import { UserOutlined } from "@ant-design/icons";

import { Layout, Menu, Form, Card, Button, Input } from "antd";
import { Header } from "antd/es/layout/layout";
import { items } from "../menuItems/loginMenuItems";

const OtpInput = () => {
  const { contextHolder, warningMsg, errorMsg } = useContext(MessageContext);
  return (
    <>
      <Header>
        <img src="/babysitterapp-Logo.png" alt="Logo" width="200" height="50" />
      </Header>
      <Menu mode="horizontal" items={items} />
      {contextHolder}
      <Layout style={{ alignItems: "center" }}>
        <Card
          title="Enter Your Email"
          bordered={true}
          style={{ height: "100%", width: "600px", marginTop: "75px" }}
        >
          <Form>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "Please input valid Email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
              <Button type="primary" htmlType="submit">
                Send OTP
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card
          title="Enter the Code your receved by Email"
          bordered={true}
          style={{ height: "100%", width: "600px", marginTop: "75px" }}
        >
          <Input placeholder="One Time passward" />
        </Card>
      </Layout>
    </>
  );
};

export default OtpInput;
