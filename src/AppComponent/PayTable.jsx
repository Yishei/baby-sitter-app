import { Table, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useContext } from "react";
import { MessageContext } from "../Context/MessageContext";
import { getFormattedPaymentsData } from "../utilities/LoderData";
import { deletePayRecordById } from "../utilities/PayFuctionality";
import PayModal from "./PayModal";
import { useLoaderData } from "react-router-dom";

const PayTable = () => {
  const [data, setData] = useState(useLoaderData());
  const [loading, setLoading] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const { messageApi, contextHolder, successMsg, errorMsg, loadingMsg } =
    useContext(MessageContext);

  const columns = [
    {
      title: "Payment ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => {
        const date1 = new Date(a.date);
        const date2 = new Date(b.date);
        return date1 > date2 ? 1 : -1;
      },
    },
    {
      title: "amount",
      dataIndex: "amount",
      key: "amount",

      sorter: (a, b) => a.amount - b.amount,
      render: (record) => {
        return `$${record.toFixed(2)}`;
      },
    },
    {
      title: "method",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditPayment(record);
              }}
            />
            <DeleteOutlined
              onClick={() => onDeletePayment(record)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const fetchDate = async () => {
    setLoading(true);
    const data = await getFormattedPaymentsData();
    setData(data);
    setLoading(false);
  };
  const onAddPayment = () => {
    setIsUpdateModalOpen(true);
  };

  const onDeletePayment = (record) => {
    Modal.confirm({
      title: "Delete Payment?",
      content: `Are you sure you want to delete this record?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        loadingMsg("Deleting Record");
        deletePayment(record);
      },
    });
  };

  const deletePayment = async (record) => {
    const res = await deletePayRecordById(record.id);
    messageApi.destroy();
    if (res === "sucsess") {
      successMsg("Record Deleted");
    } else {
      errorMsg("failed to delete record");
    }
    fetchDate();
  };

  const onEditPayment = (record) => {
    setIsEdit(true);
    setEditRecord(record);
    setIsUpdateModalOpen(true);
  };

  return (
    <>
      {contextHolder}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="primary"
          onClick={onAddPayment}
          style={{ margin: 20, alignSelf: "center" }}
        >
          Make A Payment
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        loading={loading}
      ></Table>
      <PayModal
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        fetchDate={fetchDate}
        editRecord={editRecord}
        setEditRecord={setEditRecord}
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
      />
    </>
  );
};

export default PayTable;
