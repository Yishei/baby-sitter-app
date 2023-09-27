import { Button, Card, Form, Input, InputNumber } from "antd";
import {
  PhoneTwoTone,
  UnlockTwoTone,
  CreditCardTwoTone,
  MailTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { UserContext } from "../Context/UserContext";
import { MessageContext } from "../Context/MessageContext";
import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";

const PersonalInfo = () => {
  const { contextHolder, successMsg, errorMsg } = useContext(MessageContext);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { updateUserInfo } = useContext(UserContext);

  const [form] = Form.useForm();

  const user = useLoaderData();
  const { full_name, user_email, mobile_phone, password, rate } = user;

  const onSubmit = async () => {
    form
      .validateFields()
      .then((values) => {
        setLoading(true);
        updateUserInfo(values).then((res) => {
          setLoading(false);
          if (res === "sucsess") {
            setDisabled(true);
            successMsg("You have successfully updated your personal info");
          } else {
            errorMsg("failed to connect to server");
          }
        });
      })
      .catch((err) => {});
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Card
        title="Profile"
        headStyle={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#1890ff",
          backgroundColor: "#f0f2f5",
        }}
        bodyStyle={{
          width: "75%",
        }}
      >
        {contextHolder}
        <Form
          form={form}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          disabled={disabled}
          initialValues={{
            full_name: full_name,
            user_email: user_email,
            mobile_phone: mobile_phone,
            password: password,
            rate: rate,
          }}
        >
          <Form.Item
            name="full_name"
            label="Full Name"
            required={false}
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
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            name="user_email"
            label="Email"
            required={false}
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
          >
            <Input prefix={<MailTwoTone />} />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            required={false}
            rules={[
              {
                type: "password",
              },
              {
                required: true,
                message: "Please enter your Password",
              },
              { min: 6 },
            ]}
          >
            <Input.Password prefix={<UnlockTwoTone />} disabled={disabled}/>
          </Form.Item>
          <Form.Item
            name="mobile_phone"
            label="Phone Number"
            required={false}
            rules={[
              {
                required: true,
                message: "Please enter your Phone Number",
              },
              {
                min: 11,
                message: "Phone Number must be minimum 11 digits",
              },
              {
                max: 11,
                message: "Phone Number must be maximum 11 digits",
              },
            ]}
          >
            <Input
            type="tel"
              prefix={<PhoneTwoTone rotate={135} />}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="rate"
            label="Hourly Rate"
            required={false}
            rules={[
              {
                required: true,
                message: "Please Your Hourly Rate",
              },
            ]}
          >
            <InputNumber
              prefix={<CreditCardTwoTone />}
              controls={false}
              min={0}
              precision={2}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>

        <Form>
          <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
            {!disabled ? (
              <>
                <Button type="primary" onClick={onSubmit} loading={loading}>
                  Submit
                </Button>
                <Button
                  htmlType="button"
                  onClick={onReset}
                  style={{ margin: "15px" }}
                >
                  Reset
                </Button>
                <Button
                  type="cancel"
                  onClick={() => {
                    onReset();
                    setDisabled(true);
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                type="primary"
                onClick={() => setDisabled(false)}
                style={{ width: "100%" }}
              >
                Edit
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default PersonalInfo;
