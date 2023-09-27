import moment from "moment";
import "moment-duration-format";
import {
  fetchTimeRecordsAll,
  fetchPayRecordsAll,
  fetchNotficationsAll,
  fetchTotalData,
  fetchReminderData,
} from "./fetchData";

export const getFormattedTimeData = async () => {
  try {
    const data = await fetchTimeRecordsAll();
    console.log(data);
    const objects = [];
    for (const entry of data) {
      const for_date = moment(entry.for_date).format("MM/DD/YYYY");
      const TimeIn = moment(entry.time_in);
      const TimeOut = moment(entry.time_out);
      const total =
        moment.duration(TimeOut.diff(TimeIn)).asHours().toFixed(2) * entry.rate;
      const object = {
        log_id: entry.log_id,
        for_date,
        time_in: TimeIn.format("LTS"),
        time_out: TimeOut ? TimeOut.format("LTS") : "",
        duration: moment
          .duration(TimeOut.diff(TimeIn))
          .format("HH:mm:ss", { trim: false }),
        total: total,
      };
      objects.push(object);
    }
    console.log(objects);
    return objects.reverse();
  } catch (e) {
    return null;
  }
};

export const getFormattedPaymentsData = async () => {
  try {
    const data = await fetchPayRecordsAll();
    const objects = [];
    for (const entry of data) {
      const { pay_id, pay_date, amount, pay_method } = entry;
      const object = {
        pay_id,
        pay_date: moment(pay_date).format("MM/DD/YYYY"),
        amount,
        pay_method,
      };
      objects.push(object);
    }
    return objects.reverse();
  } catch (e) {
    return null;
  }
};

export const getFormattedNotficationData = async () => {
  try {
    const data = await fetchNotficationsAll();
    const objects = [];
    for (const entry of data) {
      const { notification_id, time, title, type, body } = entry;
      const object = {
        notification_id,
        time: moment(time).format("MM/DD/YYYY"),
        title,
        type,
        body,
      };
      objects.push(object);
    }

    return objects;
  } catch (e) {
    return null;
  }
};

export const getFormattedTotalData = async () => {
  try {
    const data = fetchTotalData();
    return data;
  } catch (e) {
    console.error(e);
    return {
      money: 0,
      time: 0,
      payments: 0,
      balance: 0,
    };
  }
};

export const getUserInfo = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};

export const getFormattedReminderData = async () => {
  try {
    const data = await fetchReminderData();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
