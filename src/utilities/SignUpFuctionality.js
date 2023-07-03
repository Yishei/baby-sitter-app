const urls = require("./urls.json");
export const signup = async (values) => {
  try {
    const res = await fetch(urls.singUpUrl, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      Credentials: "omit",
    });

    return res.status;
  } catch (error) {
    return 500;
  }
};
