import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../config/apiConfig";
import { toast } from "react-toastify";
const State={
  username:"",
  email:"",
  passwords:"",
  FirstName:"",
  LastName:"",
  isAdmin:true,
  isActive:true,
  hasPasswordChange:false
}
export const Register: FC = () => {

  const navigate=useNavigate();
  const [user,setUser]=useState({
   ...State
  })
  const Register=async(e:any)=>{
    e?.preventDefault();
    try{
      const res = await apiClient.post('/user-register',user);
      console.log(res)
      if(res?.data?.code==200){
        toast.success("Created Successfully");
        setUser({...State});
        navigate("/");
      }
    }
    catch(e){
      toast.error("Something went wrong")
    }

  };
  const changeData=(e:any)=>{
    const {name,value}=e?.target;
    if(name==="isAdmin"){
      setUser((old)=>(
        {...old,["isAdmin"]:value=="admin"?true:false}
      ))
      return;
    }
    setUser(e=>{
      return {...e,[name]:value}
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
      <h2>User Registration</h2>
      <form onChange={changeData}>
        <div className="container">
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            type="text"
            className="loginInput"
            placeholder="Enter Name"
            name="username"
            required
          />
          <label htmlFor="FirstName">
            <b>FirstName</b>
          </label>
          <input
            type="text"
            className="loginInput"
            placeholder="Enter FirstName"
            name="FirstName"
            required
          />
          <label htmlFor="LastName">
            <b>LastName</b>
          </label>
          <input
            type="text"
            className="loginInput"
            placeholder="Enter LastName"
            name="LastName"
            required
          />
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            className="loginInput"
            placeholder="Enter email"
            name="email"
            required
          />

          <label htmlFor="passwords">
            <b>Password</b>
          </label>
          <input
            type="password"
            className="loginInput"
            placeholder="Enter Password"
            name="passwords"
            required
          />

          <label htmlFor="isAdmin">
            <b>Role</b>
          </label>

          <select  id="cars" className="loginInput" name="isAdmin">
            <option value="admin">Admin</option>
            <option value="user">Normal User</option>
          </select>

          <div
            style={{
              display: "flex",
              gap: "15px",
            }}
          >
            <button type="submit" className="reg" onClick={Register}>
              Register
            </button>
            <button type="submit" className="back" onClick={()=>navigate("/login")}>
              Go Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
