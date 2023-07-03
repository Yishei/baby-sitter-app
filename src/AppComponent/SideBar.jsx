import { Layout, Menu } from "antd";
import { items } from "../menuItems/sideBarItems";
const { Sider } = Layout;

const SideBar = () => {
  return (
    <Sider style={{
      overflow: "auto",
      height: "100vh",
      position: "fixed",
      left: 0,
      top: 0,
      bottom: 0,
    }}>
        <div className="ant-layout-sider-header">
          <img
            src="/babysitterapp-Logo.png"
            alt="logo"
            width="190"
            height="75"
            style={{ borderRadius: "10px", marginBottom: '40px', marginTop: '40px' }}
          />
        </div>

      <Menu
        theme="dark"
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default SideBar;
