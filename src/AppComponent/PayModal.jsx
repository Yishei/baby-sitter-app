import {
  CreditCardOutlined,
  SaveOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { options } from "../menuItems/payOptions";
import { useEffect, useState, useContext } from "react";
import { MessageContext } from "../Context/MessageContext";
import { deletePayRecordById } from "../utilities/PayFuctionality";
import {
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Modal,
  Radio,
  Select,
  Space,
  Button,
} from "antd";
import dayjs from "dayjs";
import {
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
  const [saveEnabled, setSaveEnabled] = useState(false);
  const [deleteEnabled, setDeleteEnabeld] = useState(false);
  const [payType, setPayType] = useState("amount");
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEdit && isUpdateModalOpen) {
      setDeleteEnabeld(true);
      const { pay_date, amount, pay_method } = editRecord;
      form.setFieldsValue({
        pay_date: dayjs(pay_date),
        amount: amount,
        pay_method: pay_method,
      });
    } else {
      setDeleteEnabeld(false);
    }
  }, [
    isEdit,
    isUpdateModalOpen,
    editRecord,
    form,
    setIsEdit,
    setDeleteEnabeld,
  ]);

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        loadingMsg("Sit tight...");
        if (!isEdit) {
          heandelOkIfNotEdit();
        } else {
          heandelOkIfEdit();
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

  const heandelOkIfNotEdit = async () => {
    console.log("heandelOkIfNotEdit");
    const { pay_date, amount, pay_method } = form.getFieldsValue();
    const record = {
      pay_date,
      amount,
      pay_method,
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
    const { pay_date, amount, pay_method } = form.getFieldsValue();
    const recordId = editRecord.pay_id;
    const record = {
      pay_date,
      amount,
      pay_method,
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
      pay_date: "",
      amount: "",
      pay_method: "",
    });
  };

  const onCancel = () => {
    form.resetFields();
    setIsUpdateModalOpen(false);
    setEditRecord(null);
    setIsEdit(false);
    setSaveEnabled(false);
  };

  const deletePayment = async () => {
    const res = await deletePayRecordById(editRecord.pay_id);
    messageApi.destroy();
    if (res === "sucsess") {
      successMsg("Deleted the payment");
    } else {
      errorMsg("Failed to delete the payment");
    }
    fetchDate();
  };

  const onDeletePayment = () => {
    clearForm();
    setIsUpdateModalOpen(false);
    Modal.confirm({
      title: "Delete Payment",
      content: "Are you sure you want to delete this payment?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        loadingMsg("Deleting the payment...");
        deletePayment();
        onCancel();
      },
    });
  };

  return (
    <Modal
      title={isEdit ? "Update Payment" : "Create Payment"}
      open={isUpdateModalOpen}
      onCancel={onCancel}
      destroyOnClose={true}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          danger
          key="delete"
          onClick={onDeletePayment}
          icon={<DeleteOutlined />}
          disabled={!deleteEnabled}
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
      <Space direction="Horizontal">
        <Radio.Group
          value={payType}
          onChange={(e) => setPayType(e.target.value)}
        >
          <Radio.Button value="amount">Amount</Radio.Button>
          <Radio.Button value="date-range" disabled>
            Date Range
          </Radio.Button>
        </Radio.Group>
      </Space>
      <Divider />
      {payType === "amount" ? (
        <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
          <Form.Item
            label="Date"
            name={"pay_date"}
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
              onChange={() => setSaveEnabled(true)}
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
              onChange={() => setSaveEnabled(true)}
            />
          </Form.Item>
          <Form.Item
            label="Method"
            name={"pay_method"}
            rules={[
              {
                required: true,
                message: "Please select method",
              },
            ]}
          >
            <Select
              placeholder="Select Method"
              options={options}
              onChange={() => setSaveEnabled(true)}
            />
          </Form.Item>
        </Form>
      ) : (
        <div>Not Avaleble at this time</div>
      )}
    </Modal>
  );
};

export default PayModal;
