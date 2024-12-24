import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import vinVN from "antd/locale/vi_VN";
import AppProvider from "./Components/AppContext/AppContext";
// import vinVN from "@ant-design/pro-components"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <ConfigProvider locale={vinVN}>
        <AppProvider>
        <RouterProvider router={router} />
        </AppProvider>
      </ConfigProvider>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
