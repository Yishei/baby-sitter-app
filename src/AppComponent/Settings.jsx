import {List, Card } from "antd";
import {
  IdcardTwoTone,
  CalendarTwoTone,
  RightOutlined,
} from "@ant-design/icons";
import { Outlet, NavLink } from "react-router-dom";

const Settings = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <List
          itemLayout="vertical"
          size="large"
          footer
          style={{
            overflow: "auto",
            width: "50%",
            margin: "0",
          }}
        >
          <List.Item extra={<NavLink to="/settings/personal"><RightOutlined /></NavLink>}>
            <List.Item.Meta
              avatar={<IdcardTwoTone />}
              title={<NavLink to="/settings/personal">Personal information</NavLink>}
              description="Your personal information"
            />
          </List.Item>
          <List.Item extra={<NavLink to="/settings/paySchedule"><RightOutlined /></NavLink>}>
            <List.Item.Meta
              avatar={<CalendarTwoTone />}
              title={<NavLink to="/settings/paySchedule">Payment Schedule</NavLink>}
              description="Set your payment schedule and get Notified when it's time to pay"
            />
          </List.Item>
          
          <List.Item extra={<NavLink to="/settings/timeSchedule"><RightOutlined /></NavLink>}>
            <List.Item.Meta
              avatar={<CalendarTwoTone />}
              title={<NavLink to="/settings/timeSchedule">Time Schedule</NavLink>}
              description="Set your avarege time in and out and get Notified in case of amergency"
            />
          </List.Item>
          
        </List>
        <Card
          title={<i>Account Settings</i>}
          style={{
            width: "50%",
            margin: "0",
          }}
        >
          <Outlet />
        </Card>
      </div>
    </>
  );
};
export default Settings;
