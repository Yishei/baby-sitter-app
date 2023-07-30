import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { MessageContext } from "../Context/MessageContext";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Menu, Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import { items } from "../menuItems/loginMenuItems";

const LoginPage = () => {
  const [form] = Form.useForm();
  const { logIn } = useContext(UserContext);
  const { messageApi, contextHolder, errorMsg, warningMsg, loadingMsg } =
    useContext(MessageContext);

  const navigate = useNavigate();
  const handleLogInResponse = (response) => {
    let wrong = "";
    switch (response) {
      case 200:
        navigate("/");
        break;
      case 404:
        wrong = "username";
        warningMsg("Please enter valid username");
        break;
      case 401:
        wrong = "password";
        warningMsg("Please enter valid password");
        break;
      default:
        form.resetFields();
        errorMsg("failed to connect to server");
        break;
    }
    form.setFieldValue(wrong, "");
  };

  const onFinish = async (values) => {
    loadingMsg("Logging in...");
    const response = await logIn(values);
    messageApi.destroy();
    handleLogInResponse(response);
  };

  return (
    <>
      <Header>
        <img src="/babysitterapp-Logo.png" alt="Logo" width="200" height="50" />
      </Header>
      <Menu mode="horizontal" items={items} />
      {contextHolder}
      <Layout style={{ alignItems: "center" }}>
        <Card
          title="Login"
          bordered={true}
          style={{ height: "100%", width: "500px", marginTop: "75px" }}
        >
          <Form
            form={form}
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
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
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="/otp">
                Forgot password
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
            <div>
              Not a user? <a href="/signup">Register now!</a>
            </div>
          </Form>
        </Card>
      </Layout>
    </>
  );
};

export default LoginPage;
