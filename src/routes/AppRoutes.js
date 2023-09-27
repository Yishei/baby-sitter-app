import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// loder functions
import {
  getFormattedTimeData,
  getFormattedPaymentsData,
  getFormattedNotficationData,
  getFormattedTotalData,
  getUserInfo,
  getFormattedReminderData,
} from "../utilities/LoderData";

// varify user function
import { varifyToken } from "../utilities/userFunctionality";

// global components
import SignUp from "../GlobalComponents/SignUp";
import LoginPage from "../GlobalComponents/LoginPage";
import NotFound from "../GlobalComponents/NotFound";
import About from "../GlobalComponents/About";
import OtpInput from "../GlobalComponents/otpReq";
import ResetPass from "../GlobalComponents/ResetPass";

// app components
import AppBody from "../AppComponent/AppBody";
import ClockInOut from "../AppComponent/ClockInOut";
import TimeTable from "../AppComponent/TimeTable";
import PayTable from "../AppComponent/PayTable";

// settings components
import Settings from "../AppComponent/Settings";
import PersonalInfo from "../AppComponent/Profile";
import ErrorPage from "../GlobalComponents/Error-Page";
import PaymentSchedule from "../settingsComponents/PaymentSchedule";
import TimeSchedule from "../settingsComponents/TimeSchedule";

// private route
import PrivateRoute from "./PriveteRoute";

const appRoutes = createBrowserRouter(
  createRoutesFromElements(
    // app routes
    <Route>
      <Route path="/">
        <Route
          path="/"
          element={<AppBody />}
          loader={getFormattedNotficationData}
          errorElement={<ErrorPage />}
        >
          <Route path="/" element={<PrivateRoute />} loader={varifyToken}>
            <Route
              index
              element={<ClockInOut />}
              loader={getFormattedTotalData}
              errorElement={<ErrorPage />}
            />
          </Route>

          <Route path="/" element={<PrivateRoute />} loader={varifyToken}>
            <Route
              path="Payments"
              element={<PayTable />}
              loader={getFormattedPaymentsData}
            />
          </Route>
          <Route path="/" element={<PrivateRoute />} loader={varifyToken}>
            <Route
              path="timeCard"
              element={<TimeTable />}
              loader={getFormattedTimeData}
              errorElement={<ErrorPage />}
            />
          </Route>
          <Route path="/" element={<PrivateRoute />} loader={varifyToken}>
            <Route
              path="profile"
              element={<PersonalInfo />}
              loader={getUserInfo}
              errorElement={<ErrorPage />}
            />
          </Route>

          {/* settings routes */}
          <Route
            path="settings"
            element={<PrivateRoute />}
            loader={varifyToken}
          >
            <Route path="/settings" element={<Settings />}>
              <Route path="paySchedule" element={<PaymentSchedule />} />
              <Route
                path="timeSchedule"
                element={<TimeSchedule />}
                loader={getFormattedReminderData}
              />
            </Route>
          </Route>
        </Route>
      </Route>
      {/* glubal routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/otp" element={<OtpInput />} />
      <Route path="resetPass" element={<ResetPass />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default appRoutes;
