import { useEffect, useState } from "react";
import { getFormattedNotficationData } from "../utilities/LoderData";
import { Drawer, Card, Empty, Avatar, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
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
      <span className="bell-Avatar-Span  hed-ave" >
        <Badge count={notificationCount} size="small">
        <Avatar
          size={45}
          icon={<BellOutlined />}
          onClick={showDrawer}
        />
        </Badge>
      </span>

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
            key={notification.notification_id}
            title={`${notification.title}-${notification.time}`}
            style={{ width: 325, marginTop: 5 }}
          >
            <Meta title={notification.type} description={notification.body} />
          </Card>
        ))}
      </Drawer>
    </>
  );
};

export default Notifications;
