const urls = require("./urls.json");

export const createReminders = async (reminders) => {
  try {
    console.log(reminders);
    const newArray = [];
    for (const key in reminders) {
      if (reminders[key] === undefined) {
        continue;
      }
      const [dayOfWeek, inOutStatus] = key.split("-");
      const weekDayNumber = getWeekNumFromStr(dayOfWeek);

      const newObj = {
        user_id: 1, // TODO: change this to the user's id
        reminder_name: key,
        week_day: weekDayNumber,
        reminder_type: inOutStatus,
      };
      newArray.push(newObj);
    }
    console.log(newArray);
    await fetch(urls.createRemindersUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArray),
    });
    return;
  } catch (e) {
    console.trace(e);
  }
};

const getWeekNumFromStr = (dayString) => {
  return daysOfWeek[dayString];
};

const daysOfWeek = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};
