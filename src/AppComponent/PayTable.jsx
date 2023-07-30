import {
  Table,
  Button,
  Divider,
  Dropdown,
  Card,
  Space,
  FloatButton,
} from "antd";
import {
  ToolOutlined,
  FilterOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import { useState, useContext } from "react";
import { MessageContext } from "../Context/MessageContext";
import { getFormattedPaymentsData } from "../utilities/LoderData";
import PayModal from "./PayModal";
import { useLoaderData } from "react-router-dom";
import exportFromJSON from "export-from-json";

const PayTable = () => {
  const [data, setData] = useState(useLoaderData());
  const [loading, setLoading] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const { contextHolder } = useContext(MessageContext);

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

  const onEditPayment = (record) => {
    setIsEdit(true);
    setEditRecord(record);
    setIsUpdateModalOpen(true);
  };

  const handleOnExport = () => {
    const fileName = "payments";
    const exportType = exportFromJSON.types.csv;

    exportFromJSON({ data, fileName, exportType });
  };

  const items = [
    {
      key: "1",
      label: "Download",
      icon: <CloudDownloadOutlined />,
      onClick: handleOnExport,
    },
    {
      key: "2",
      label: "Filter",
      icon: <FilterOutlined />,
    },
  ];

  return (
    <>
      {contextHolder}
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Space direction="vertical">
          <Button
            type="primary"
            onClick={onAddPayment}
            style={{ width: "150px" }}
          >
            Make A Payment
          </Button>
          <Dropdown
            menu={{
              items: items,
              selectable: true,
              defaultActiveFirst: true,
              onClick: ({ key, label }) => console.log(`${key}: ${label}`),
            }}
          >
            <Button
              type="default"
              icon={<ToolOutlined />}
              style={{ width: "150px" }}
            >
              Options
            </Button>
          </Dropdown>
        </Space>
        <Space>
          <Card
            title="Total Payments"
            style={{
              width: "300px",
              backgroundColor: "#f0f2f5",
              margin: "20 20 0 0",
              textAlign: "center",
            }}
          >
            <strong>${data.reduce((a, b) => a + b.amount, 0)}</strong>
          </Card>
        </Space>
      </Space>
      <Divider orientation="left"> Payment History</Divider>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              onEditPayment(record);
            },
          };
        }}
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
      <FloatButton.BackTop />
    </>
  );
};

export default PayTable;
