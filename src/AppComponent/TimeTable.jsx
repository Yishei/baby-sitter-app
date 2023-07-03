import { Button, Modal, Table } from "antd";
import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { MessageContext } from "../Context/MessageContext";
import { getFormattedTimeData } from "../utilities/LoderData";
import {
  deleteTimeRecordById,
} from "../utilities/ClockFuctionality";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ClockModal from "./ClockModal";
import { useLoaderData } from "react-router-dom";

const TimeTable = () => {
  const [data, setData] = useState(useLoaderData());
  const [loading, setLoading] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const { messageApi, contextHolder, successMsg, errorMsg, loadingMsg } =
    useContext(MessageContext);
  const { getClockedInStatusAndId, retsetUserInfo } = useContext(UserContext);

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
    {
      title: "Action",
      key: "action",
      width: "15%",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditTimeRecord(record);
              }}
            />
            <DeleteOutlined
              onClick={() => onDeleteTimeRecord(record)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
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

  const onDeleteTimeRecord = async (record) => {
    Modal.confirm({
      title: "Delete Time Record",
      content: `Are you sure you want to delete this record?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        loadingMsg("Deleting...");
        deleteTimeRecord(record);
      },
    });
  };

  const deleteTimeRecord = async (record) => {
    const res = await deleteTimeRecordById(record.id);
    const { isClockdIn, ClockdInId } = getClockedInStatusAndId();
    if (isClockdIn && ClockdInId === record.id) {
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

  const onEditTimeRecord = (record) => {
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
          onClick={onAddTimeRecord}
          style={{ margin: 20, alignSelf: "center" }}
        >
          Add Time Record
        </Button>
      </div>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
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
    </>
  );
};

export default TimeTable;
