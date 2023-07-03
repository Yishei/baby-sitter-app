import { useEffect, useState } from "react";
import { getFormattedNotficationData } from "../utilities/LoderData";
import { FloatButton, Drawer, Card, Empty } from "antd";
import { BellFilled } from "@ant-design/icons";
const { Meta } = Card;

const Notifications = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(null);

  const getNotifications = async () => {
    const response = await getFormattedNotficationData();
    if (response) {
      setNotifications(response);
      setNotificationCount(response.length);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const onClose = () => {
    setDrawerOpen(false);
  };

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  return (
    <>
      <FloatButton
        tooltip="Notifications"
        shape="circle"
        type="primary"
        icon={<BellFilled />}
        onClick={showDrawer}
        badge={{
          count: notificationCount,
          color: "red",
          size: "small",
        }}
        style={{
          right: 50,
        }}
      />
      <Drawer
        title="Notifications"
        placement="right"
        onClose={onClose}
        open={drawerOpen}
        drawerStyle={{ textAlign: "center" }}
      >
        {notifications.length === 0 && <Empty description="No Notifications" />}

        {notifications.map((notification) => (
          <Card
            key={notification.id}
            title={`${notification.title}-${notification.time}`}
            style={{ width: 325, marginTop: 5 }}
          >
            <Meta title={notification.Type} description={notification.Body} />
          </Card>
        ))}
      </Drawer>
    </>
  );
};

export default Notifications;
