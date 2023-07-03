import moment from "moment";
import "moment-duration-format";
import {
  fetchTimeRecordsAll,
  fetchPayRecordsAll,
  fetchNotficationsAll,
  fetchTotalData,
} from "./fetchData";

export const getFormattedTimeData = async () => {
  try {
    const data = await fetchTimeRecordsAll();
    const objects = [];
    for (const entry of data) {
      const date = moment(entry.forDate).format("MM/DD/YYYY");
      const TimeIn = moment(entry.TimeIn);
      const TimeOut = moment(entry.TimeOut);
      const total =
        moment.duration(TimeOut.diff(TimeIn)).asHours().toFixed(2) * entry.Rate;
      const object = {
        id: entry.Id,
        date: date,
        timeIn: TimeIn.format('LTS'),
        timeOut: TimeOut ? TimeOut.format('LTS') : "",
        duration: moment
          .duration(TimeOut.diff(TimeIn))
          .format("HH:mm:ss", { trim: false }),
        total: total,
      };
      objects.push(object);
    }
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
      const date = moment(entry.payDate).format("MM/DD/YYYY");
      const object = {
        id: entry.paymentId,
        date: date,
        amount: entry.amount,
        method: entry.payMethod,
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
      const time = moment(entry.Time).format("MM/DD/YYYY");
      const object = {
        id: entry.NotificationId,
        time: time,
        title: entry.Title,
        Type: entry.Type,
        Body: entry.Body,
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
