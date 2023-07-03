import { Button, Form, Input, InputNumber } from "antd";
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

const PersonalInfo = () => {
  const { contextHolder, successMsg, errorMsg } = useContext(MessageContext);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { userInfo, updateUserInfo } = useContext(UserContext);
  const { fullName, Email, phone, Password, Rate } = userInfo;
  const [form] = Form.useForm();

  const onSubmit = async () => {
    form
      .validateFields()
      .then((values) => {
        setLoading(true);
        updateUserInfo(values).then((res) => {
          setLoading(false);
          console.log(res)
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
      {contextHolder}
      <h1>Personal</h1>
      <Form
        form={form}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        disabled={disabled}
        initialValues={{
          fullName: fullName,
          Email: Email,
          phone: phone,
          Password: Password,
          Rate: Rate,
        }}
      >
        <Form.Item
          name="fullName"
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
          name="Email"
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
          name="Password"
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
          <Input.Password prefix={<UnlockTwoTone />} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          required={false}
          rules={[
            {
              required: true,
              message: "Please enter your Phone Number",
            },
          ]}
        >
          <InputNumber
            prefix={<PhoneTwoTone rotate={135} />}
            controls={false}
            minLength={11}
            maxLength={11}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name="Rate"
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
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
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
    </>
  );
};

export default PersonalInfo;
