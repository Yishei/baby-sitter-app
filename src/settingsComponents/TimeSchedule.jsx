import ScheduleForm from "./ScheduleForm";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const TimeSchedule = () => {
  const [reminders, setReminders] = useState(useLoaderData());
  console.log('reminders',reminders);

  return (
    <>
      <ScheduleForm weekDay="Monday" />
      <ScheduleForm weekDay="Tuesday" />
      <ScheduleForm weekDay="Wednesday" />
      <ScheduleForm weekDay="Thursday" />
      <ScheduleForm weekDay="Friday" />
    </>
  );
};

export default TimeSchedule;
