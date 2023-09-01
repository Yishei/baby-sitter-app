import { Table, Divider, FloatButton } from "antd";
import { useState, useContext } from "react";
import { MessageContext } from "../Context/MessageContext";
import { getFormattedPaymentsData } from "../utilities/LoderData";
import PayModal from "./PayModal";
import { payColumns } from "../menuItems/tableColumns";
import { useLoaderData } from "react-router-dom";
import exportFromJSON from "export-from-json";
import TableTop from "./TableTop";

const PayTable = () => {
  const [data, setData] = useState(useLoaderData());
  const [loading, setLoading] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const { contextHolder } = useContext(MessageContext);

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


  return (
    <>
      {contextHolder}
      <TableTop
        newBtnFnc={onAddPayment}
        newBtnTxt={"Make A Payment"}
        handleOnExport={handleOnExport}
      />

      <Divider orientation="left"> Payment History</Divider>
      <Table
        columns={payColumns}
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
      <FloatButton.BackTop
        style={{
          right: 25,
          bottom: 100,
        }}
      />
    </>
  );
};

export default PayTable;
