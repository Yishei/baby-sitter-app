import { Navigate, Outlet, useLoaderData } from "react-router-dom";

const PrivateRoute = () => {
  const isAuth = useLoaderData();
  console.log(isAuth);

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
