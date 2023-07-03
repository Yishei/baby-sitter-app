import { useEffect, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { MessageContext } from "../Context/MessageContext";
import dayjs from "dayjs";
import { Form, Modal, DatePicker, TimePicker } from "antd";
import {
  getTimeRecordById,
  createNewTimeRcord,
  updateTimeRecordById,
} from "../utilities/ClockFuctionality";

const ClockModal = (props) => {
  const {
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    editRecord,
    setEditRecord,
    isEdit,
    setIsEdit,
    fetchData,
  } = props;
  const { getClockedInStatusAndId, retsetUserInfo } = useContext(UserContext);
  const { messageApi, successMsg, errorMsg, loadingMsg } =
    useContext(MessageContext);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEdit && isUpdateModalOpen) {
      getTimeRecordById(editRecord.id).then((data) => {
        if (data === null) {
          setIsEdit(false);
          return;
        }
        form.setFieldsValue({
          date: dayjs(data.forDate),
          timeIn: dayjs(data.TimeIn),
          timeOut: data.TimeOut === null ? "" : dayjs(data.TimeOut),
        });
      });
    }
  }, [isEdit, isUpdateModalOpen, editRecord, form, setIsEdit]);

  const onOk = async () => {
    form
      .validateFields()
      .then((values) => {
        loadingMsg("Sit tight...");
        if (!isEdit) {
          hendelOkIfNotEdit();
        } else {
          hendelOkIfEdit();
        }
        clearForm();
        setIsUpdateModalOpen(false);
        setEditRecord(null);
        setIsEdit(false);
      })
      .catch((errorInfo) => {
        return;
      });
  };

  const hendelOkIfNotEdit = async () => {
    const { date, timeIn, timeOut } = form.getFieldsValue();
    const record = {
      forDate: date,
      timeIn: timeIn,
      timeOut: timeOut,
      InSource: "Log Time",
      OutSource: "Log Time",
    };
    const res = await createNewTimeRcord(record);
    messageApi.destroy();
    if (res === "sucsess") {
      successMsg("Added a new record");
      fetchData();
    } else {
      errorMsg("Failed to add a new record");
    }
  };

  const hendelOkIfEditAndClockedIn = async () => {
    const {isClockdIn, ClockdInId } = getClockedInStatusAndId();
    if (isClockdIn && ClockdInId === editRecord.id) {
          await retsetUserInfo(false);
    }
  };

  const hendelOkIfEdit = async () => {
    const { date, timeIn, timeOut } = form.getFieldsValue();
    const recordId = editRecord.id;
    const record = {
      forDate: date,
      timeIn: timeIn,
      timeOut: timeOut === "" ? null : timeOut,
    };

    const res = await updateTimeRecordById(recordId, record);
    messageApi.destroy();

    if (res === "sucsess") {
      if (editRecord.timeOut === "Invalid date" && timeOut !== null) {
        hendelOkIfEditAndClockedIn();
      }
      fetchData();
      successMsg("Updated the record");
    } else {
      errorMsg("Failed to update the record");
    }
  };

  const clearForm = () => {
    form.setFieldsValue({
      date: "",
      timeIn: "",
      timeOut: "",
    });
  };

  const onCancel = () => {
    form.resetFields();
    setIsUpdateModalOpen(false);
    setEditRecord(null);
    setIsEdit(false);
  };

  return (
    <Modal
      title={isEdit ? "Update Time Record" : "Log Time"}
      okText="Add"
      open={isUpdateModalOpen}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 14 }}>
        <Form.Item
          label="Date"
          name={"date"}
          required={false}
          rules={[
            {
              required: true,
              message: "Please input date!",
            },
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            format={"MM/DD/YYYY"}
            disabledDate={(date) => date > new Date()}
          />
        </Form.Item>
        <Form.Item
          label="Time In"
          name={"timeIn"}
          required={false}
          rules={[
            {
              required: true,
              message: "Please input time in!",
            },
          ]}
        >
          <TimePicker use12Hours format="h:mm A" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Time Out"
          name={"timeOut"}
          required={false}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("timeIn") < value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Time out must be greater than time in!")
                );
              },
            }),
          ]}
        >
          <TimePicker use12Hours format="h:mm A" style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ClockModal;
