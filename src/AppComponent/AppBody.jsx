import "../App.css";
import { Layout, Spin, theme } from "antd";
import { Outlet } from "react-router-dom";
import SideBare from "./SideBar";
import { useNavigation } from "react-router-dom";
import AppHeader from "./AppHeader";
const { Content, Footer } = Layout;

function AppBody() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  let navigation = useNavigation();
  return (
    <Layout hasSider>
      <SideBare />

      <Layout style={{ marginLeft: 200 }}>
        <AppHeader />
        <Spin spinning={navigation.state === "loading"} size="large">
          <Content
            className={navigation.state === "loading" ? "loading" : ""}
            style={{
              top: "100px",
              margin: "1px 1px 1 1px",
              overflow: "initial",
            }}
          >
            <div
              style={{
                top: "100px",
                position: "relative",
                padding: 24,
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Spin>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          BabySitterApp ©2023
        </Footer>
      </Layout>
    </Layout>
  );
}

export default AppBody;
