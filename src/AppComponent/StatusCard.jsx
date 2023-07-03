import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { Card, Col } from "antd";

const StatusCard = () => {
  const { getClockedInStatusAndId } = useContext(UserContext);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Col span={12}>
      <Card className="status-perent-card" bordered={true}>
        <div
          className="status-perent-card-div"
          style={{
            color: getClockedInStatusAndId().isClockdIn ? "green" : "#1677ff",
          }}
        >
          {getClockedInStatusAndId().isClockdIn ? "Clocked In" : "Clocked Out"}
        </div>
        <Card
          className="status-child-card"
          bordered={true}
          style={{
            background: getClockedInStatusAndId().isClockdIn ? "green" : "#1677ff",
          }}
        >
          <div className="status-child-card-div">
            {now.toLocaleDateString("en-US", { weekday: "long" })}
          </div>
          <div className="status-child-card-div">
            {now.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </div>
        </Card>
      </Card>
    </Col>
  );
};

export default StatusCard;
