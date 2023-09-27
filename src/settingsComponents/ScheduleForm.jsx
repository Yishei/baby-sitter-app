import { TimePicker, Button, Form, Space, Card } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import urls from "../utilities/urls.json";

const ScheduleForm = ({ weekDay }) => {
  const [disabled, setDisabled] = useState(true);
  const [weekDayInId, setWeekDayInId] = useState(null);
  const [weekDayOutId, setWeekDayOutId] = useState(null);
  const [form] = Form.useForm();

  const tagelDisabled = () => {
    setDisabled(!disabled);
  };

  const fetchReminders = async () => {
    const res = await fetch(`${urls.getRemindersUrl}${weekDay}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    console.log(data);
    data.forEach((reminder) => {
      if (reminder.reminder_type === "in") setWeekDayInId(reminder.reminder_id);
      if (reminder.reminder_type === "out") setWeekDayOutId(reminder.reminder_id);
      // form.setFieldsValue({
      //   [reminder.reminder_name]: moment(reminder.reminder_time),
      // });
    });
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <Card
      title={weekDay}
      headStyle={{
        backgroundColor: "#f0f2f5",
        fontWeight: "bold",
        textAlign: "center",
      }}
      bodyStyle={{ padding: "0px" }}
      style={{
        margin: "5px",
      }}
      size="small"
    >
      <Form
        form={form}
        initialValues={{
          [`${weekDay}-in`]: moment("8:00 AM", "h:mm A"),
          [`${weekDay}-Out`]: moment("5:00 PM", "h:mm A"),
        }}
      >
        <Space
          direction="horizontal"
          align="center"
          style={{
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Form.Item
            label="In"
            name={`${weekDay}-in`}
            required={true}
            style={{ margin: "10px" }}
          >
            <TimePicker
              use12Hours
              format="h:mm A"
              disabled={disabled}
              rules={[
                {
                  required: true,
                },
              ]}
            ></TimePicker>
          </Form.Item>
          <Form.Item
            label="Out"
            name={`${weekDay}-Out`}
            required={true}
            style={{ margin: "10px" }}
            rules={[
              {
                validator: async (_, value) => {
                  if (
                    value &&
                    value.isBefore(form.getFieldValue(`${weekDay}-in`))
                  ) {
                    throw new Error("Out time must be after In time");
                  }
                },
              },
              {
                required: true,
              },
            ]}
          >
            <TimePicker
              use12Hours
              format="h:mm A"
              disabled={disabled}
            ></TimePicker>
          </Form.Item>
          <Space direction="vertical" style={{ padding: "10px" }}>
            {disabled ? (
              <Button
                type="primary"
                onClick={tagelDisabled}
                style={{ width: "75px" }}
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  type="cancel"
                  htmlType="button"
                  onClick={() => {
                    form.resetFields();
                    tagelDisabled();
                  }}
                  style={{ width: "75px" }}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    form
                      .validateFields()
                      .then((values) => {
                        console.log(values);
                        tagelDisabled();
                      })
                      .catch((info) => {
                        console.log("Validate Failed:", info);
                      });
                  }}
                  style={{ width: "75px" }}
                >
                  Save
                </Button>
              </>
            )}
          </Space>
        </Space>
      </Form>
    </Card>
  );
};

export default ScheduleForm;
