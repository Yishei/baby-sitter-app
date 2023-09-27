import { createContext, useState } from "react";
import { update_User_Info } from "../utilities/userFunctionality";
import {
  clockIn,
  clockOut,
  updateClockInState,
} from "../utilities/ClockFuctionality";
import { logInUser } from "../utilities/userFunctionality";


export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});


  window.onload = () => {
    console.log("window loaded");
    hendleLocalStorage();
  };


  const hendleLocalStorage = () => {
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        setUserInfo(user);
      }
    } else {
      setUserInfo({});
    }
  };

  const retsetUserInfo = async (clockState) => {
    try {
      const res = await updateClockInState(clockState);
      localStorage.setItem("user", JSON.stringify(res));
      setUserInfo(res);
    } catch (e) {
      return "fail";
    }
  };

  const hendleClockState = (clockState) => {
    if (localStorage.getItem("user")) {
      const newUserInfo = JSON.parse(localStorage.getItem("user"));
      newUserInfo.isClockdIn = clockState;
      localStorage.setItem("user", JSON.stringify(newUserInfo));
      setUserInfo(newUserInfo);
    }
  };

  const getClockedInStatusAndId = () => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      return {
        isClockdIn: user.is_clockd_in,
        ClockdInId: user.Clockd_In_id,
      };
    }
  };

  const logIn = async (values) => {
    try {
      const resObj = await logInUser(values);
      const { status, token, user } = resObj;
      if (status === 200) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUserInfo(user);
      }
      return status;
    } catch (e) {
      return 500;
    }
  };

  const clockInUser = async () => {
    try {
      let res = await clockIn();
      localStorage.setItem("user", JSON.stringify(res));
      setUserInfo(res);
      return "sucsess";
    } catch (e) {
      return "fail";
    }
  };

  const clockOutUser = async () => {
    try {
      const id = getClockedInStatusAndId().ClockdInId;
      const res = await clockOut(id);
      localStorage.setItem("user", JSON.stringify(res));
      setUserInfo(res);
      return "sucsess";
    } catch (e) {
      return "fail";
    }
  };

  const updateUserInfo = async (userInfo) => {
    try {
      const info = await update_User_Info(userInfo);
      localStorage.setItem("user", JSON.stringify(info));
      setUserInfo(info);
      console.log('user info updated', userInfo)
      return "sucsess";
    } catch (e) {
      return "fail";
    }
  };

  const values = {
    userInfo,
    hendleClockState,
    getClockedInStatusAndId,
    logIn,
    clockInUser,
    clockOutUser,
    updateUserInfo,
    retsetUserInfo,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContext;
