import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { MessageContext } from "../Context/MessageContext";
import { Button } from "antd";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const ClockBtn = ({ btnForIn }) => {
  const { hendleClockState, getClockedInStatusAndId, clockInUser, clockOutUser } = useContext(UserContext);
  const { messageApi, contextHolder, successMsg, errorMsg, loadingMsg } =
    useContext(MessageContext);

  const handleclockIn = async () => {
    loadingMsg("Clocking In...");
    const clockStatus = await clockInUser();
    messageApi.destroy();
    if (clockStatus === 'sucsess') {
      hendleClockState(true);
      successMsg("Clocked In Successfully");
    } else {
      errorMsg("Something went wrong");
    }
  };

  const handleclockOut = async () => {
    loadingMsg("Clocking Out...");
    const clockStatus = await clockOutUser();
    messageApi.destroy();
    if (clockStatus === 'sucsess') {
      hendleClockState(false);
      successMsg("Clocked Out Successfully");
    } else {
      errorMsg("Something went wrong");
    }
  };
  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        icon={btnForIn ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
        onClick={btnForIn ? handleclockIn : handleclockOut}
        disabled={btnForIn ? getClockedInStatusAndId().isClockdIn : !getClockedInStatusAndId().isClockdIn}
        className="clock-btn"
        style={{
          background: btnForIn ? "green" : "#1677ff",
        }}
      >
        {btnForIn ? "Clock In" : "Clock Out"}
      </Button>
    </>
  );
};

export default ClockBtn;
