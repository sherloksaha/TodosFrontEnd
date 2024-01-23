import React, { useContext, useEffect } from "react";
import { Header } from "../CustomComponent/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { apiClient } from "../config/apiConfig";

export const LayOut = () => {
  const {token,currentUser,setCurrentUser} = useContext(AuthContext);
  const nav = useNavigate();
  const CheckExpToken = async () => {
    try {
      const res = await apiClient.get("/check-token");
      if(res.data.msg==="Token_Expired") {
        localStorage.removeItem("userData");
        nav("/login");
        return
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  
  useEffect(() => {
   
    CheckExpToken();
    if (!token) {
      console.log("rerererererer")
      nav("/login");
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
      <div
        style={{
          paddingTop: "60px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};
