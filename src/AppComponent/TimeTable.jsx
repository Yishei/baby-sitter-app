import { useState, useContext } from "react";
import { MessageContext } from "../Context/MessageContext";
import { getFormattedTimeData } from "../utilities/LoderData";
import ClockModal from "./ClockModal";
import { timeColumns } from "../menuItems/tableColumns";
import { useLoaderData } from "react-router-dom";
import exportFromJSON from "export-from-json";
import { Table, FloatButton, Divider } from "antd";
import TableTop from "./TableTop";

const TimeTable = () => {
  const [data, setData] = useState(useLoaderData());
  const [loading, setLoading] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const { contextHolder } = useContext(MessageContext);

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

  return (
    <>
      {contextHolder}
      <TableTop
        newBtnFnc={onAddTimeRecord}
        newBtnTxt={"Add Time Record"}
        handleOnExport={handleOnExport}
      />

      <Divider orientation="left">Time History</Divider>
      <Table
        columns={timeColumns}
        rowKey={(record) => record.log_id}
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
      <FloatButton.BackTop style={{
          right: 25,
          bottom: 75,
        }}/>
    </>
  );
};

export default TimeTable;
