import {
  FieldTimeOutlined,
  ClockCircleOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

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
    label: <NavLink to="/timeCard">Time Card</NavLink>,
    key: "3",
    icon: <ClockCircleOutlined />,
  },
];
