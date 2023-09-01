import {
  Form,
  Button,
  Checkbox,
  Input,
  InputNumber,
  Spin,
  Layout,
  Card,
} from "antd";
import { signup } from "../utilities/SignUpFuctionality";
import { useState, useContext } from "react";
import { MessageContext } from "../Context/MessageContext";
import SignUpSuccess from "./SignUpSuccess";
import GlobalHeader from "./GlobalHeader";

const SignUp = () => {
  const [signedUp, setSignedUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { contextHolder, warningMsg, errorMsg } = useContext(MessageContext);

  const handleSingUpResponse = (status) => {
    switch (status) {
      case 200:
        setSignedUp(true);
        break;
      case 409:
        warningMsg(
          "the Email or the phone number you entered is already in use"
        );
        break;
      default:
        errorMsg(
          "For some reason the system is not willing to let you sign up"
        );
        break;
    }
    form.resetFields();
  };

  const onFinish = async (values) => {
    setLoading(true);
    const statusCode = await signup(values);
    handleSingUpResponse(statusCode);
    setLoading(false);
  };

  return (
    <>
      <GlobalHeader />
      {contextHolder}
      {!signedUp ? (
        <Spin spinning={loading} tip="Signing Up...">
          <Layout style={{ alignItems: "center" }}>
            <Card
              title="Sign Up"
              bordered={true}
              style={{ height: "100%", width: "600px", marginTop: "75px" }}
            >
              <Form
                form={form}
                onFinish={(values) => onFinish(values)}
                name="normal_signup"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
              >
                <Form.Item
                  name="fullName"
                  label="Full Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Name",
                    },
                    {
                      whitespace: true,
                      message: "Please enter your Name",
                    },
                    {
                      min: 3,
                      message: "Name must be minimum 3 characters",
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Enter you Name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Eamil"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Email",
                    },
                    {
                      type: "email",
                      message: "Please enter valid Email",
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Enter you Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
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
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Phone Number",
                    },
                    {
                      max: 11,
                    },
                    {
                      min: 11,
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Enter you Phone#" type="tel" />
                </Form.Item>
                <Form.Item
                  name="rate"
                  label="Rate"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your rate",
                    },
                  ]}
                  hasFeedback
                >
                  <InputNumber
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    placeholder="Enter you rate"
                    controls={false}
                    min={0}
                    precision={2}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  name="agree"
                  valuePropName="checked"
                  wrapperCol={{ offset: 10, span: 14 }}
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject("To proceed, agree to terms"),
                    },
                  ]}
                >
                  <Checkbox>
                    I have read the{" "}
                    <a href="/about" target="blank">
                      terms and conditions
                    </a>
                  </Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                  <Button type="primary" htmlType="submit" block>
                    Sign Up
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Layout>
        </Spin>
      ) : (
        <SignUpSuccess />
      )}
    </>
  );
};

export default SignUp;
