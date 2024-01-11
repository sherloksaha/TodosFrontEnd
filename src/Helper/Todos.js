import { toast } from "react-toastify";
import { apiClient } from "../config/apiConfig";

export const deleteTodos=async(id,CallUsers,close)=>{
    const payload={
      tid:id
    }
    try{
      const del = await apiClient.post('/delete-todo',payload);
      if(del?.data?.ack==1){
        CallUsers();
        close();
      }
      else{
        toast.error("could not delete item...")
      }
    }catch(e){
      console.log(e)
    }
  }

  export const completeTask=async(id,CallUsers,close)=>{
    const payload={
      tid:id
    }
    try{
      const com = await apiClient.put('/complete-task',payload);
      if(com?.data?.ack==1){
        toast.success("Mark Completed")
        CallUsers();
        close();
      }
      else{
        toast.error("could not delete item...")
      }
    }
    catch(e){
      console.log(e)
    }
  }