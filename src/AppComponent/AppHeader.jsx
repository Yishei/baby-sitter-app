import { List, Popover, Avatar } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { logOutUser } from "../utilities/userFunctionality";
import NotificationsAvatar from "./NotificationsAvatar";

const AppHeader = () => {
  const [open, setOpen] = useState(false);
  const content = (
    <div style={{ width: "150px", padding: 0 }}>
      <List size="small">
        <List.Item>
          <List.Item.Meta
            avatar={<UserOutlined />}
            title={<NavLink to="/profile">Profile</NavLink>}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<SettingOutlined />}
            title={<NavLink to="/settings/">Settings</NavLink>}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<LogoutOutlined />}
            title={
              <NavLink to="/login" onClick={logOutUser} replace={true}>
                Log Out
              </NavLink>
            }
          />
        </List.Item>
      </List>
    </div>
  );

  const handleVisibleChange = (newOpen) => {
    setOpen(newOpen);
  };
  return (
    <div
      style={{
        padding: 0,
        background: "rgb(245, 245, 245)",
        height: "100px",
        position: "fixed",
        top: 0,
        left: "200px",
        right: 0,
        zIndex: 1,
      }}
    >
      <div className="ant-Avatar-div">
        <NotificationsAvatar />
        <Popover
          placement="bottomRight"
          content={content}
          trigger="hover"
          open={open}
          onOpenChange={handleVisibleChange}
        >
          <Avatar
            size={45}
            icon={<UserOutlined />}
            className="user-Avatar hed-ave"
          />
        </Popover>
      </div>
    </div>
  );
};

export default AppHeader;
