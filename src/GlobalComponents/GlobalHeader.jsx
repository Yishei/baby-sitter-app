import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { items } from "../menuItems/loginMenuItems";

const GlobalHeader = () => {
  return (
    <>
      <Header>
        <a href="/">
        <img src="/babysitterapp-Logo.png" alt="Logo" width="200" height="50" />
        </a>
      </Header>
      <Menu mode="horizontal" items={items} />
    </>
  );
};

export default GlobalHeader;
