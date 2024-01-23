import React, { FC, useContext, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { AuthContext } from "../context/authContext";
import { Dropdown } from "react-bootstrap";
import { CustomDropDown } from "./CustomDropDown";
import { useNavigate } from "react-router-dom";
export const Header = () => {
  const nav=useNavigate()
  const { setCurrentUser, currentUser, setToken } = useContext(AuthContext);
  return ( 
    <header className="App-header">
      <div>
        <p
          style={{
            backgroundColor: "#DC143C",
            padding: "3px",
          }}
        >
          ToDo List
        </p>
      </div>

      <p>Welcome {currentUser?.isAdmin ? "Admin" : "User"}!!</p>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <div style={{ marginTop: "4px", cursor: "pointer" }}>
          
          <CustomDropDown
            dropDownName={currentUser?.Name || "Null"}
            DropDownKeys={[
              {
                value: `User Type : ${currentUser?.isAdmin ? "Admin" : "User"}`,
              },
              {
                value: "LogOut",
                fun: function (e) {
                  localStorage.removeItem("userData");
                  setToken("");
                  setCurrentUser("");
                  nav("/")
                },
              },
            ]}
          />
        </div>
      </div>
    </header>
  );
};
