const urls = require("./urls.json");
export const getTimeRecordById = async (id) => {
  try {
    let record = await fetch(`${urls.getTimeByIdUrl}${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    record = await record.json();
    return record;
  } catch (e) {
    window.location.reload();
    return null;
  }
};

export const createNewTimeRcord = async (record) => {
  try {
    await fetch(urls.createNewTimeUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    });
    return "sucsess";
  } catch (e) {
    return "fail";
  }
};

export const updateTimeRecordById = async (id, record) => {
  try {
    await fetch(`${urls.updateTimeByIdUrl}${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    });
    return "sucsess";
  } catch (e) {
    return "fail";
  }
};

export const deleteTimeRecordById = async (id) => {
  try {
    await fetch(`${urls.deleteTimeByIdUrl}${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return "sucsess";
  } catch (e) {
    return "fail";
  }
};

// context functions
export const clockIn = async () => {
  try {
    const respons = await fetch(urls.clockInUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timeIn: new Date(), forDate: new Date() }),
    });
    let info = await respons.json();
    return info;
  } catch (e) {
    throw new Error(e);
  }
};

export const clockOut = async (recordId) => {
  try {
    const respons = await fetch(`${urls.clockOutUrl}${recordId}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ out: new Date() }),
    });
    let info = await respons.json();
    return info;
  } catch (e) {
    throw new Error(e);
  }
};

export const getLestRecordId = async () => {
  try {
    const respons = await fetch(urls.getLestTimeUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const record = await respons.json();
    return record.Id;
  } catch (e) {
    return "fail";
  }
};

export const updateClockInState = async (state) => {
  try {
    const res = await fetch(`${urls.updateClockInStateUrl}${state}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    let info = await res.json();
    return info;
  } catch (e) {
    return "fail";
  }
};
