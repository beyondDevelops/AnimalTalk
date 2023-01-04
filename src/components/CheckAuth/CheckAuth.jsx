import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import api from "../../api/axios";

const CheckAuth = () => {
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      const getUserInfo = async () => {
        try {
          const res = await api.get("/user/myinfo", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserInfo({ ...res.data.user });
        } catch (err) {
          console.log(err);
        }
      };
      getUserInfo();
    }
  }, [token, userInfo]);

  return (
    <UserContext.Provider value={{ ...userInfo }}>
      {token ? <Outlet /> : <Navigate to="/login" replace="true" />}
    </UserContext.Provider>
  );
};

export default CheckAuth;
