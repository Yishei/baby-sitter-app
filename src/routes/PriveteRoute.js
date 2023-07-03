import { Navigate, Outlet, useLoaderData } from "react-router-dom";

const PrivateRoute = () => {
  const isAuth = useLoaderData();

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
