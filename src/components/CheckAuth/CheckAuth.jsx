import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../api/axios";

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
          // 데이터 receive 체킹
          // console.log(res.data.user);
          setUserInfo({ ...res.data.user });
        } catch (err) {
          console.log(err);
        }
      };
      getUserInfo();
    }
  }, [token, userInfo]);

  return (
    <AuthContext.Provider value={{ ...userInfo }}>
      {token ? <Outlet /> : <Navigate to="/login" replace="true" />}
    </AuthContext.Provider>
  );
};

export default CheckAuth;
