import "../App.css";
import { Layout, Spin, theme } from "antd";
import { Outlet } from "react-router-dom";
import Notifications from "./Notifications";
import SideBare from "./SideBar";
import { Header } from "antd/es/layout/layout";
import { useNavigation } from "react-router-dom";
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
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          />
          <Spin spinning={navigation.state === "loading"} size="large">
            <Content
              className={navigation.state === "loading" ? "loading" : ""}
              style={{
                margin: "24px 16px 0",
                overflow: "initial",
              }}
            >
              <div
                style={{
                  padding: 24,
                  background: colorBgContainer,
                }}
              >
                <Outlet />
              </div>
            </Content>
          </Spin>
          <Notifications />
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
