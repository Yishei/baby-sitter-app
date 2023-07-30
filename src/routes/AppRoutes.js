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
} from "../utilities/LoderData";
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
import PersonalInfo from "../settingsComponents/PersonalInfo";
import ErrorPage from "../GlobalComponents/Error-Page";
import PaymentSchedule from "../settingsComponents/PaymentSchedule";
import TimeSchedule from "../settingsComponents/TimeSchedule";

// private route
import PrivateRoute from "./PriveteRoute";

const appRoutes = createBrowserRouter(
  createRoutesFromElements(
    // app routes
    <Route>
      <Route path="/" element={<PrivateRoute />} loader={varifyToken}>
        <Route path="/">
          <Route
            path="/"
            element={<AppBody />}
            loader={getFormattedNotficationData}
            errorElement={<ErrorPage />}
          >
            <Route
              index
              element={<ClockInOut />}
              loader={getFormattedTotalData}
              errorElement={<ErrorPage />}
            />
            <Route
              path="data"
              element={<TimeTable />}
              loader={getFormattedTimeData}
              errorElement={<ErrorPage />}
            />
            <Route
              path="Payments"
              element={<PayTable />}
              loader={getFormattedPaymentsData}
            />

            {/* settings routes */}
            <Route path="/settings" element={<Settings />}>
              <Route path="personal" element={<PersonalInfo />} />
              <Route path="paySchedule" element={<PaymentSchedule />} />
              <Route path="timeSchedule" element={<TimeSchedule />} />
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
