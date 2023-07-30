import { useContext } from "react";
import { MessageContext } from "../Context/MessageContext";
import { Card, Form, Layout, Menu, Button, Input } from "antd";
import { Header } from "antd/es/layout/layout";
import { items } from "../menuItems/loginMenuItems";

const ResetPass = () => {
  const { contextHolder } = useContext(MessageContext);
  return (
    <>
      <Header>
        <img src="/babysitterapp-Logo.png" alt="Logo" width="200" height="50" />
      </Header>
      <Menu mode="horizontal" items={items} />
      {contextHolder}
      <Layout style={{ alignItems: "center" }}>
        <Card
          title="Reset PassWord"
          bordered={true}
          style={{ height: "100%", width: "600px", marginTop: "75px" }}
        >
          <Form labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
            <Form.Item
              name="password"
              label="Password"
              required={false}
              rules={[
                {
                  required: true,
                  message: "Please enter your Password",
                },
                { min: 6 },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Enter you Password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              required={false}
              rules={[
                {
                  required: true,
                  message: "Please confirm your Password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords does not match!")
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
              <Button type="primary" htmlType="submit" block>
                Reset PassWord
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Layout>
    </>
  );
};

export default ResetPass;
