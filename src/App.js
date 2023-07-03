import "./App.css";
import { Layout } from "antd";
import { RouterProvider } from "react-router-dom";
import appRoutes from "./routes/AppRoutes";

const App = () => {

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <RouterProvider router={appRoutes} />
    </Layout>
  );
};

export default App;
