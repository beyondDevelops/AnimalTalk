import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const CheckAuth = () => {
  const token = localStorage.getItem("token");

  return <>{token ? <Outlet /> : <Navigate to="/login" replace="true" />}</>;
};

export default CheckAuth;
