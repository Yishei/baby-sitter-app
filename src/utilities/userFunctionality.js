const urls = require("./urls.json");

export const logInUser = async (values) => {
  const { username, password } = values;
  try {
    const response = await fetch(urls.singInUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      Credentials: "omit",
    });
    const resObj = {
      status: response.status,
      token: response.headers.get("token"),
      user: await response.json(),
    };

    return resObj;
  } catch (error) {
    throw new Error(error);
  }
};

export const logOutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const varifyToken = async () => {
  try {
    const response = await fetch(urls.verifyTokenUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.status === 200) {
      return true;
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const update_User_Info = async (userInfo) => {
  try {
    const response = await fetch(urls.updateUserInfoUrl, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const info = await response.json();
    return info;
  } catch (e) {
    throw new Error(e);
  }
};

export const getUserInfo = async () => {
  try {
    const respons = await fetch(urls.getUserInfoUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const info = await respons.json();
    return info;
  } catch (e) {
    throw new Error(e);
  }
};
