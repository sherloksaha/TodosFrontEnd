import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/authContext";

export const LogIn = () => {
  const nav= useNavigate();
  const [user,setUser]=useState({
    username:"",
    passwords:""
  })
  const {token,logIn}=useContext(AuthContext);
  useEffect(()=>{
    if (token) {
      nav("/");
    }
  },[token])
  const [error,setError]=useState("");
 
  const changeValue=(e:any)=>{
    const {name,value}=e?.target
    setUser((old)=>{
      return {...old,[name]:value}
    })
  }
  console.log(user)
  return (
    <div
      style={{
        width: "60%",
        height: "100%",
        margin: "auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "#FFE4C4",
          height: "55px",
        }}
      >
       Welcome To ToDO Application
      </h2>
      <h3 style={{textAlign:'center'}}>Login Form</h3>
      <form>
        <div className="imgcontainer">
          <img
            src="data:image/png;base64,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"
            alt="Avatar"
            className="avatar"
          />
        </div>

        <div className="container">
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
          onChange={changeValue}
            type="text"
            className="loginInput"
            placeholder="Enter Username"
            name="username"
            required
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
          onChange={changeValue}
            type="password"
            className="loginInput"
            placeholder="Enter Password"
            name="passwords"
            required
          />

          <button type="submit" className="log" onClick={(e)=>logIn(e,setError,nav,user)}>
            Login
          </button>
        </div>
        <p style={{color:'red',textAlign:'center'}}>{error && error}</p>
      
      </form>
    </div>
  );
};
