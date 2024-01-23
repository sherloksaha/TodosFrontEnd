import { createContext, useEffect, useState } from "react";
import { apiClient } from "../config/apiConfig";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [token, setToken] = useState(localStorage.getItem("userData") || "");
  const logIn = async (e, setError, nav, user) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/user-login", user);
      if (res?.data?.err) {
        setError("Something Went Wrong...");
      } else {
        setError("");
      }
      if (
        res?.data?.data === "Need_to_change_password" &&
        res?.data?.ack === 0
      ) {
        nav("/reset-password");
        return;
      }
      localStorage.setItem("userData", JSON.stringify(res?.data?.token));
      setToken(localStorage.getItem("userData"));
      nav("/");
    } catch (error) {
      toast.error("No User");
    }
  };
  const getUserDetails = async () => {
    try {
      const data = await apiClient.get("/user-details");
      setCurrentUser(data?.data?.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (!token) setToken(localStorage.getItem("userData") || "");

    if (!currentUser.uid && token) {
      getUserDetails();
    }
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        setToken: setToken,
        setCurrentUser: setCurrentUser,
        logIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
