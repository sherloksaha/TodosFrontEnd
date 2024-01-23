import React, { useContext, useEffect, useState } from "react";
import { SingleTodo } from "../CustomComponent/SingleTodo";
import { useNavigate, useParams } from "react-router-dom";
import { AddTask } from "../Modals/AddTask";
import { apiClient } from "../config/apiConfig";
import { AuthContext } from "../context/authContext";
import { usePaginate } from "../Hooks/usePaginate";
import { CustomDropDown } from "../CustomComponent/CustomDropDown";

export const Todo = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [take] = useState(8);
  const [totalLength, setTotalLength] = useState(0);
  const [isActive, setIsAvtive] = useState(true);
  const [isForUser, setIsForUser] = useState(false);
  const { id } = useParams();
  const nav = useNavigate();
  const [Todo, setTodos] = useState([]);
  const PagiNation = usePaginate(page, Todo, setPage, totalLength);
  console.log("I am in HOOOOMMMEEEEEEEE USSSSEEEERRRRRRRRR")

  const ToDosValues = async () => {
    const activeStat = {
      isActive: isActive,
      take: take,
      page: page,
    };

    try {
      const res = await apiClient.post(
        `/get-task/${id || currentUser?.id}`,
        activeStat
      );
      setTodos(res?.data?.data);
      setTotalLength(res.data.TotalPage);
    } catch (e) {
      console.log(e);
    }
  };
  
  useEffect(() => {
    if (id || currentUser?.id) ToDosValues();
  }, [isActive, currentUser?.id,page]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
        }}
      >
        {currentUser?.isAdmin && (
          <button className="normal-button" onClick={() => nav(-1)}>
            Go Back To Home
          </button>
        )}
        <button className="normal-button" onClick={() => setShowModal(true)}>
          Add Task For Yourself
        </button>
        {currentUser?.isAdmin && (
          <button
            className="normal-button"
            onClick={() => {
              setIsForUser(true);
              setShowModal(true);
            }}
          >
            Add Task For Users
          </button>
        )}
        <div
          style={{
            marginTop: "5px",
            marginLeft: "8px",
          }}
        >
          <CustomDropDown
            dropDownName={isActive ? "Pending Task" : "Completed Task"}
            DropDownKeys={[
              {
                value: "Pending",
                fun: function (e) {
                  setIsAvtive(e?.target?.name == "Pending" ? true : false);
                },
              },
              {
                value: "Completed",
                fun: function (e) {
                  setIsAvtive(e?.target?.name == "Pending" ? true : false);
                },
              },
            ]}
          />
        </div>
      </div>
      {!Todo?.length ? (
        <div
          style={{
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>Sorry No Data Found For This User!!</h3>
        </div>
      ) : (
        <div className="userdivTodo">
          {Todo?.map((e) => (
            <SingleTodo
              single={e}
              setShow={setDeleteModal}
              show={deleteModal}
              ToDosValues={ToDosValues}
            />
          ))}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <PagiNation />
      </div>

      <div
        style={{
          position: "fixed",
          top: "25px",
          left: "35%",
          zIndex: 999,
        }}
      >
        <AddTask
          show={showModal}
          setShow={setShowModal}
          ToDosValues={ToDosValues}
          setIsForUser={setIsForUser}
          isForUser={isForUser}
          id={id}
        />
      </div>
    </>
  );
};
