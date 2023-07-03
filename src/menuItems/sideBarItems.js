import {
  DatabaseOutlined,
  FieldTimeOutlined,
  SettingOutlined,
  LoginOutlined,
  ClockCircleOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { logOutUser } from "../utilities/userFunctionality";

export const items = [
  {
    label: <NavLink to="/">Clock In</NavLink>,
    key: "1",
    icon: <FieldTimeOutlined />,
  },
  {
    label: <NavLink to="/Payments">Make a Payment</NavLink>,
    key: "2",
    icon: <CreditCardOutlined />,
  },
  {
    label: "Reports",
    key: "4",
    icon: <DatabaseOutlined />,
    children: [
      {
        label: <NavLink to="/Payments">Payments</NavLink>,
        key: "sub1",
        icon: <CreditCardOutlined />,
      },
      {
        label: <NavLink to="/data">Time Card</NavLink>,
        key: "sub2",
        icon: <ClockCircleOutlined />,
      },
    ],
  },
  {
    label: <NavLink to="/settings">Settings</NavLink>,
    key: "5",
    icon: <SettingOutlined />,
  },
  {
    label: (
      <NavLink to="/login" onClick={logOutUser} replace={true}>
        Log Out
      </NavLink>
    ),
    key: "6",
    icon: <LoginOutlined />,
  },
];
