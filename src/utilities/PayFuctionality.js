const urls = require("./urls.json");
export const getPayRecordById = async (id) => {
  try {
    let record = await fetch(`${urls.getPayByIdUrl}${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    record = await record.json();
    return record;
  } catch (e) {
    return null;
  }
};

export const getPayByDate = async (dateObj) => {
  try {
    let records = await fetch(`${urls.getPayByDateUrl}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dateObj),
    });

    records = await records.json();
    return records;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const createNewPayRecord = async (record) => {
  try {
    await fetch(urls.createNewPayUrl, {
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

export const updatePayRecordById = async (id, record) => {
  try {
    await fetch(`${urls.updatePayByIdUrl}${id}`, {
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

export const deletePayRecordById = async (id) => {
  try {
    await fetch(`${urls.deletePayByIdUrl}${id}`, {
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

/**
 *
 * @param {Date} firstDateOfWeek
 */
const getLastDateOfWeek = (firstDateOfWeek) => {
  const dayOfWeek = firstDateOfWeek.getDay();
  const lastDateOfWeek = new Date(firstDateOfWeek);
  lastDateOfWeek.setDate(lastDateOfWeek.getDate() + 6 - dayOfWeek);
};
