import React from "react";
import { useNavigate } from "react-router-dom";

export const CreateUser = () => {
   const nav= useNavigate()
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Create User</h3>
      <form>
        <div className="container">
          <label htmlFor="name">
            <b>Name</b>
          </label>
          <input
            type="text"
            className="loginInput"
            placeholder="Enter Username"
            name="name"
            required
          />

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            className="loginInput"
            placeholder="Enter Username"
            name="email"
            required
          />

          <label htmlFor="uname">
            <b>Username</b>
          </label>
          <input
            type="text"
            className="loginInput"
            placeholder="Enter Username"
            name="uname"
            required
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            className="loginInput"
            placeholder="Enter Password"
            name="psw"
            required
          />

          <div className="modal-body">
            <label htmlFor="user">Choose a User &nbsp;</label>
            <select name="user" id="user">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
            </select>
          </div>
        </div>

        <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
          <button
            type="button"
            className="reg"
            // onClick={() => navigate("/register")}
          >
            Create
          </button>
          <button
            type="button"
            className="reg"
            style={{
                marginLeft:'5px'
            }}
            onClick={() => nav("/")}
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};
