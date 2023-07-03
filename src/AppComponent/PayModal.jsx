import { CreditCardOutlined } from "@ant-design/icons";
import { options } from "../menuItems/payOptions";
import { useEffect, useState, useContext } from "react";
import { MessageContext } from "../Context/MessageContext";
import {
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Modal,
  Radio,
  Select,
  Space,
} from "antd";
import dayjs from "dayjs";
import {
  getPayRecordById,
  createNewPayRecord,
  updatePayRecordById,
} from "../utilities/PayFuctionality";

const PayModal = (props) => {
  const {
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    editRecord,
    setEditRecord,
    isEdit,
    setIsEdit,
    fetchDate,
  } = props;
  const { messageApi, successMsg, errorMsg, loadingMsg } =
    useContext(MessageContext);

  const [payType, setPayType] = useState("amount");
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEdit && isUpdateModalOpen) {
      getPayRecordById(editRecord.id).then((data) => {
        if (data === null) {
          setIsEdit(false);
          return;
        }
        form.setFieldsValue({
          date: dayjs(data.payDate),
          amount: data.amount,
          method: data.payMethod,
        });
      });
    }
  }, [isEdit, isUpdateModalOpen, editRecord, form, setIsEdit]);

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        loadingMsg("Sit tight...");
        if (isEdit) {
          heandelOkIfEdit();
        } else {
          heandelOkIfNotEdit();
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

  const heandelOkIfNotEdit = async () => {
    const { date, amount, method } = form.getFieldsValue();
    const record = {
      payDate: date,
      amount,
      payMethod: method,
    };
    const res = await createNewPayRecord(record);
    messageApi.destroy();
    if (res === "sucsess") {
      successMsg("Added a new record");
      fetchDate();
    } else {
      errorMsg("Failed to add a new record");
    }
  };

  const heandelOkIfEdit = async () => {
    const { date, amount, method } = form.getFieldsValue();
    const recordId = editRecord.id;
    const record = {
      payDate: date,
      amount,
      payMethod: method,
    };

    const res = await updatePayRecordById(recordId, record);
    messageApi.destroy();
    if (res === "sucsess") {
      fetchDate();
      successMsg("Updated the record");
    } else {
      errorMsg("Failed to update the record");
    }
  };

  const clearForm = () => {
    form.setFieldsValue({
      date: "",
      amount: "",
      method: "",
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
      title={isEdit ? "Update Payment" : "Create Payment"}
      okText="Save"
      open={isUpdateModalOpen}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Space direction="Horizontal">
        <Radio.Group
          value={payType}
          onChange={(e) => setPayType(e.target.value)}
        >
          <Radio.Button value="amount">Amount</Radio.Button>
          <Radio.Button value="date-range">Date Range</Radio.Button>
        </Radio.Group>
      </Space>
      <Divider />
      {payType === "amount" ? (
        <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
          <Form.Item
            label="Date"
            name={"date"}
            rules={[
              {
                required: true,
                message: "Please select date",
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
            label="Amount"
            name={"amount"}
            rules={[
              {
                required: true,
                message: "Please input amount",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              controls={false}
              min={0}
              precision={2}
              prefix={<CreditCardOutlined />}
            />
          </Form.Item>
          <Form.Item
            label="Method"
            name={"method"}
            rules={[
              {
                required: true,
                message: "Please select method",
              },
            ]}
          >
            <Select placeholder="Select Method" options={options} />
          </Form.Item>
        </Form>
      ) : (
        <div>Not Avaleble at this time</div>
      )}
    </Modal>
  );
};

export default PayModal;
