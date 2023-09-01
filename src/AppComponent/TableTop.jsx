import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  DatePicker,
  Dropdown,
  Form,
  Modal,
  Select,
  Space,
} from "antd";
import { ToolOutlined, FilterOutlined } from "@ant-design/icons";
import { options } from "../menuItems/OptionItems";
import { getPayByDate } from "../utilities/PayFuctionality";
const { RangePicker } = DatePicker;
const { Option } = Select;

const TableTop = ({ newBtnFnc, newBtnTxt, handleOnExport }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("DateRange");
  const [form] = Form.useForm();

  const PickerWithType = ({ type, onChange }) => {
    if (type === "DateRange") return <RangePicker onChange={onChange} />;
    if (type === "date") return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} />;
  };

  const setIsOpen = () => {
    setOpen(true);
  };

  const onOk = async () => {
    const {date} = form.getFieldsValue();
    const [startDate, endDate] = date
    let record = {
      type,
      startDate,
      endDate
    }
    console.log("form rec", record)
    let data = await getPayByDate(record);
    console.log(data);
    setOpen(false);
  };



  return (
    <Space style={{ width: "100%", justifyContent: "space-between" }}>
      <Space direction="vertical">
        <Button type="primary" onClick={newBtnFnc} style={{ width: "150px" }}>
          {newBtnTxt}
        </Button>
        <Badge count={<FilterOutlined style={{ color: "#f5222d" }} />}>
          <Dropdown
            menu={{
              items: options(handleOnExport, setIsOpen),
              selectable: true,
              defaultActiveFirst: true,
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
        </Badge>
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
      <Modal
        title="Filter"
        open={open}
        onOk={onOk}
        onCancel={() => {
          setOpen(false);
        }}
      >

        <Form
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item label="Filter Type" name={"filter-Type"}>
            <Select value={type} onChange={setType} style={{ width: "130px" }}>
              <Option value="DateRange">Date Range</Option>
              <Option value="date">Date</Option>
              <Option value="week">Week</Option>
              <Option value="month">Month</Option>
              <Option value="year">Year</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name={"date"}>
            <PickerWithType
              type={type}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default TableTop;
