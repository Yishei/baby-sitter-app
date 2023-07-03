import { Divider, Row } from "antd";
import { useLoaderData } from "react-router-dom";
import TotalCard from "./TotalCard";
import UserCard from "./UserCard";
import StatusCard from "./StatusCard";
import ClockBtn from "./ClockBtn";
import "../App.css";

const formetAsCurrency = (value) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};


const ClockInOut = () => {
  const loaderData = useLoaderData();
  const money = formetAsCurrency(loaderData.money);
  const time = loaderData.time;
  const payments = formetAsCurrency(loaderData.payments);
  const balance = formetAsCurrency(loaderData.balance);

  return (
    <>
      <div className="clock-in-btn-div">
        <ClockBtn btnForIn={true} />
        <ClockBtn btnForIn={false} />
      </div>
      <Divider />
      <Row gutter={20}>
        <UserCard />
        <StatusCard />
      </Row>
      <Divider />
      <Row gutter={20}>
        <TotalCard title="Total Money" value={money} color="blue" />
        <TotalCard title="Total Hours" value={time} color="blue" />
      </Row>
      <Divider />
      <Row gutter={20}>
        <TotalCard title="Payments" value={payments} color="blue" />
        <TotalCard
          title="Balance"
          value={balance}
          color={loaderData.balance.toFixed(2) > 0 ? "red" : "green"}
        />
      </Row>
    </>
  );
};

export default ClockInOut;
