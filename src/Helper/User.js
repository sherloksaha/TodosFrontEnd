import { toast } from "react-toastify";
import { apiClient } from "../config/apiConfig";

export const deleteUser = async (id, CallUsers, close) => {
  try {
    const payLoad = {
      id: id,
    };
    const res = await apiClient.post("/delete", payLoad);
    if (res?.data?.ack == 0) {
      toast.error("Can not delete yourself");
    } else {
      CallUsers();
      close();
    }
  } catch (e) {
    console.log(e);
  }
};

export const deactiveUser = async (id, CallUsers,close,isActive) => {
  const p = {
    id: id,
    isActive:!isActive
  };
  try {
    const res = await apiClient.put("/change-active", p);
    if(res?.data?.ack==0){
        toast.error(res.data.msg);
    }
    else{
        CallUsers();
        close()
    }
  } catch (e) {
    console.log(e);
  }
};
