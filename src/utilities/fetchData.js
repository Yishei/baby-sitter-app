const urls = require("./urls.json");
export const fetchTimeRecordsAll = async () => {
  try {
    const response = await fetch(urls.getAllTimeUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const fetchPayRecordsAll = async () => {
  try {
    const response = await fetch(urls.getAllPaymentsUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const fetchNotficationsAll = async () => {
  try {
    const response = await fetch(urls.getAllNotficationsUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const fetchTotalData = async () => {
  try {
    const res = await fetch(urls.getTotalDataUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};
