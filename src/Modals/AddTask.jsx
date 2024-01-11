import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../context/authContext";
import { apiClient } from "../config/apiConfig";
import moment from "moment";
import { toast } from "react-toastify";

const data = {
  desc: "",
  title: "",
  uid: "",
  isActive: true,
  ownerId: "",
  createdAt: moment(new Date()).format("MM/DD/YYYY"),
  updatedAt: moment(new Date()).format("MM/DD/YYYY"),
  lastDate: "",
};
export const AddTask = ({
  show,
  setShow,
  ToDosValues,
  id,
  isForUser,
  setIsForUser,
}) => {
  const { currentUser } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [todoTask, setTodoTask] = useState({
    ...data,
    ownerId: id ? id : "",
  });
  const createTask = async (e) => {
    e?.preventDefault();

    for (let i of Object.keys(todoTask)) {
      if (!todoTask[i]) {
        if (!isForUser && i === "uid") {
        } else {
          toast.error(`please fill ${i}`);
          return;
        }
      }
    }

    try {
      const dataRes = await apiClient.post("/task-create", todoTask);
      console.log(dataRes);
      if (dataRes?.data?.code == 200) {
        setShow(false);
        ToDosValues();
        setTodoTask({ ...data });
      } else {
        toast.error("Something went wrong....");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const changeData = async (e) => {
    const { name, value } = e?.target;
    setTodoTask((old) => {
      return { ...old, ownerId: id ? id : currentUser?.id, [name]: value };
    });
  };

  const fetchUsers = async () => {
    try {
      const res = await apiClient.get("/get-all-users");
      setAllUsers(res?.data?.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    currentUser?.isAdmin && fetchUsers();
  }, [currentUser]);
  return (
    <div
      className="modal show"
      style={{
        display: show ? "block" : "none",
        position: "initial",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <Modal.Dialog>
        <Modal.Body>
          <form onChange={changeData}>
            <div>
              <div className="modal-content">
                <div className="modal-header">
                  <h5>ADD TODO TASK</h5>
                </div>

                <div className="modal-body">
                  <label htmlFor="title">Task Title</label>
                  <br />
                  <input type="text" name="title" value={todoTask?.title} />
                </div>
                <div className="modal-body">
                  <label htmlFor="desc">Description</label>
                  <br />
                  <textarea
                    class="form-control"
                    name="desc"
                    value={todoTask?.desc}
                    rows="3"
                  ></textarea>
                </div>
                {isForUser && (
                  <div className="modal-body">
                    <label htmlFor="desc">user</label>
                    <br />
                    <select
                      class="form-select"
                      name="uid"
                      aria-label="size 3 select example"
                    >
                      <option selected>Select Users</option>
                      {allUsers?.map((e) => (
                        <option value={e?.uid}>{e?.FirstName}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="modal-body">
                  <label htmlFor="lastDate">Estimated Completion Date</label>
                  <br />
                  <input
                    type="date"
                    name="lastDate"
                    value={todoTask?.lastDate}
                  />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setTodoTask({ ...data });
              setShow(false);
              setIsForUser(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              createTask(e);
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};
