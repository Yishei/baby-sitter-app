import { useEffect, useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { MessageContext } from "../Context/MessageContext";
import dayjs from "dayjs";
import { Form, Modal, DatePicker, TimePicker, Button } from "antd";
import {
  getTimeRecordById,
  createNewTimeRcord,
  updateTimeRecordById,
} from "../utilities/ClockFuctionality";
import { deleteTimeRecordById } from "../utilities/ClockFuctionality";

import { SaveOutlined, DeleteOutlined } from "@ant-design/icons";

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
  const [saveEnabled, setSaveEnabled] = useState(false);
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
    setSaveEnabled(false);
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
    const { isClockdIn, ClockdInId } = getClockedInStatusAndId();
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
    setSaveEnabled(false);
  };

  const deleteTimeRecord = async () => {
    const res = await deleteTimeRecordById(editRecord.id);
    const { isClockdIn, ClockdInId } = getClockedInStatusAndId();
    if (isClockdIn && ClockdInId === editRecord.id) {
      retsetUserInfo(false);
    }

    messageApi.destroy();
    if (res === "sucsess") {
      successMsg("deleted");
    } else {
      errorMsg("failed to delete");
    }
    fetchData();
  };

  const onDeleteTimeRecord = async () => {
    clearForm();
    setIsUpdateModalOpen(false);
    Modal.confirm({
      title: "Delete Time Record",
      content: `Are you sure you want to delete this record?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        loadingMsg("Deleting...");
        deleteTimeRecord();
        onCancel();
      },
    });
  };

  return (
    <Modal
      title={isEdit ? "Update Time Record" : "Log Time"}
      okText="Save"
      open={isUpdateModalOpen}
      onCancel={onCancel}
      distroyOnClose={true}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          danger
          key="delete"
          onClick={onDeleteTimeRecord}
          icon={<DeleteOutlined />}
        >
          Delete
        </Button>,
        <Button
          key="ok"
          type="primary"
          onClick={onOk}
          icon={<SaveOutlined />}
          disabled={!saveEnabled}
        >
          Save
        </Button>,
      ]}
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
            onChange={() => setSaveEnabled(true)}
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
          <TimePicker
            use12Hours
            format="h:mm A"
            style={{ width: "100%" }}
            onChange={() => setSaveEnabled(true)}
          />
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
          <TimePicker
            use12Hours
            format="h:mm A"
            style={{ width: "100%" }}
            onChange={() => setSaveEnabled(true)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ClockModal;
