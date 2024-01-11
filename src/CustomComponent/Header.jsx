import React, { FC, useContext, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { AuthContext } from "../context/authContext";
import { Dropdown } from "react-bootstrap";
import { CustomDropDown } from "./CustomDropDown";
export const Header = () => {
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
          {/* <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {currentUser?.Name||"Null"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              
              <Dropdown.Item href="#/action-1">
                User Type : {currentUser?.isAdmin ? "Admin" : "User"}
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-3"
                onClick={() => {
                  localStorage.removeItem("userData");
                  setToken("");
                  setCurrentUser("");
                }}
              >
                LogOut
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
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
                },
              },
            ]}
          />
        </div>
      </div>
    </header>
  );
};
