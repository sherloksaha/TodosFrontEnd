import { UserInput } from "../CustomComponent/UserInput";
import { AddButton } from "../CustomComponent/AddButton";
import { Card } from "../CustomComponent/Card";
import { AddUserModal } from "../Modals/AddUserModal";
import { Chart } from "../CustomComponent/Chart";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDeleteModal } from "../Modals/UserDeleteModal";
import { AddTask } from "../Modals/AddTask";
import { AuthContext } from "../context/authContext";
import { apiClient } from "../config/apiConfig";
import { usePaginate } from "../Hooks/usePaginate";
import { CustomDropDown } from "../CustomComponent/CustomDropDown";

export const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData,setUserData]=useState([]);
  const [page,setPage]=useState(1);
  let countRef=useRef(0);
  const [filterData,setFilterData]=useState("");
  const [take]=useState(3);
  const [totalLength,setTotalLength]=useState(0);
  const [isActive,setIsAvtive]=useState(true)
  const PagiNation=usePaginate(page,userData,setPage,totalLength);
  const CallUsers=async()=>{
    try{
      const payload={
        take:take,
        page:page,
        filterData:filterData,
        isActive:isActive
      }
     const res=await apiClient.post('/all-user-paginate',payload);
     setUserData(res.data.data);
     setTotalLength(res.data.TotalPage)
    }
    catch(e){
      console.log(e)
    }
  }
  
  useEffect(() => {
    if(countRef>0){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
    !countRef.current>0 && countRef.current++;
    currentUser?.isAdmin && CallUsers();
  }, [page,currentUser,filterData,isActive]);
  const navigator = useNavigate();
  
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showAddUser, setUserAdd] = useState(false);
  return (
    <>
      <div className="body">
        <div
          style={{
            display: "flex",
          }}
        >
          &nbsp;&nbsp;&nbsp;
          {currentUser?.isAdmin && (
            <AddButton
              modals={showAddUser}
              setModal={setUserAdd}
              text="register"
            />
          )}{" "}
          &nbsp;&nbsp;&nbsp;
          {!currentUser?.isAdmin && <button className="succ" onClick={() => setShowModal(true)}>
            Add Task
          </button>}
          &nbsp;&nbsp;&nbsp;
          {currentUser?.isAdmin && (
            <button className="succ" onClick={() => navigator(`/todo/${currentUser?.id}`)}>
              See Your Todos
            </button>
          )}
        </div>

        {showAddUser && (
          <AddUserModal setModal={setUserAdd} modals={showAddUser} />
        )}
        <div
          style={{
            position: "absolute",
            top: "25px",
            left: "40%",
            zIndex: 999,
          }}
        >
          <AddTask show={showModal} setShow={setShowModal} />
        </div>

        {/* ------------------------chart--------------------------------------------- */}
        <Chart />
        

        {/* {//------------------User Section---------------------------------------} */}
        <h4 className="mt-3">Users Section</h4>
        <UserInput setFilterData={setFilterData} filterData={filterData}/>
        <CustomDropDown
            dropDownName={isActive ? "Active Users" : "Inactive Users"}
            DropDownKeys={[
              {
                value: "Active",
                fun: function (e) {
                  setIsAvtive(e?.target?.name == "Active" ? true : false);
                },
              },
              {
                value: "Inactive",
                fun: function (e) {
                  setIsAvtive(e?.target?.name == "Active" ? true : false);
                },
              },
            ]}
          />
        {currentUser?.isAdmin && (
          <div className="userdiv">
            {userData?.map((e,ind) => (
              <Card data={e} key={ind} id={e?.uid} CallUsers={CallUsers}/>
            ))}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PagiNation/>
        </div>
        <div style={{ marginBottom: "80px", visibility: "hidden" }}>fgh</div>
      </div>
      {/* ---------------------End User------------------------------------------------- */}
      
      
      <UserDeleteModal
        show={deleteModal}
        setShow={setDeleteModal}
        children={<p>Are you sure you want to delete it?</p>}
      />
    </>
  );
};
