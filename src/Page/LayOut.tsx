import React, { useContext, useEffect } from "react";
import { Header } from "../CustomComponent/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { apiClient } from "../config/apiConfig";

export const LayOut = () => {
  const { token, setCurrentUser, currentUser } = useContext(AuthContext);
  const nav = useNavigate();

  const getUserDetails = async () => {
    try {
      const data = await apiClient.get("/user-details");
      setCurrentUser(data?.data?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (!token) {
      nav("/login");
    } else {
      getUserDetails();
    }
  }, [token]);
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Header />
      <div style={{
        paddingTop:"60px"
      }}>
        <Outlet />
      </div>
    </div>
  );
};
