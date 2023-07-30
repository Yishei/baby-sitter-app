import {
  Button,
  Table,
  FloatButton,
  Space,
  Dropdown,
  Card,
  Divider,
} from "antd";
import { useState, useContext } from "react";
import { MessageContext } from "../Context/MessageContext";
import { getFormattedTimeData } from "../utilities/LoderData";
import {
  CloudDownloadOutlined,
  FilterOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import ClockModal from "./ClockModal";
import { useLoaderData } from "react-router-dom";
import exportFromJSON from "export-from-json";

const TimeTable = () => {
  const [data, setData] = useState(useLoaderData());
  const [loading, setLoading] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const { contextHolder } = useContext(MessageContext);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "7%",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Date",
      dataIndex: "date",
      width: "15%",
      sorter: (a, b) => {
        const date1 = new Date(a.date);
        const date2 = new Date(b.date);
        return date1 > date2 ? -1 : 1;
      },
    },
    {
      title: "Time In",
      dataIndex: "timeIn",
      key: "In",
      width: "15%",
    },
    {
      title: "Time Out",
      dataIndex: "timeOut",
      key: "out",
      width: "15%",
      render: (value) => {
        if (value === "Invalid date") {
          return <div style={{ color: "red" }}>Missing Punch</div>;
        } else return value;
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      width: "20%",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (value) => {
        return isNaN(value) ? "" : `$${value.toFixed(2)}`;
      },
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    const data = await getFormattedTimeData();
    setData(data);
    setLoading(false);
  };

  const onAddTimeRecord = () => {
    setIsUpdateModalOpen(true);
  };

  const onEditTimeRecord = (record) => {
    setIsEdit(true);
    setEditRecord(record);
    setIsUpdateModalOpen(true);
  };

  const handleOnExport = () => {
    const fileName = "Time Sheet";
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
      <Space style={{ display: "flex", justifyContent: "space-between" }}>
        <Space direction="vertical">
          <Button
            type="primary"
            onClick={onAddTimeRecord}
            style={{ width: "150px" }}
          >
            Add Time Record
          </Button>
          <Dropdown
            menu={{
              items: items,
              selectable: true,
              defaultActiveFirst: true,
              onClick: () => console.log("click"),
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
            title="Total Hours"
            style={{
              width: "300px",
              backgroundColor: "#f0f2f5",
              margin: "20 20 0 0",
              textAlign: "center",
            }}
          >
            <strong>{255}</strong>
          </Card>
        </Space>
      </Space>
      <Divider orientation="left">Time History</Divider>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              onEditTimeRecord(record);
            },
          };
        }}
        loading={loading}
      />
      <ClockModal
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        fetchData={fetchData}
        editRecord={editRecord}
        setEditRecord={setEditRecord}
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
      />
      <FloatButton.BackTop />
    </>
  );
};

export default TimeTable;
