import { AiFillDelete } from "react-icons/ai";
import { FiCheckSquare } from "react-icons/fi";
import moment from "moment";
import { UserView } from "../Modals/UserView";
import { completeTask, deleteTodos } from "../Helper/Todos";
import { useState } from "react";

export const SingleTodo = ({ single, setShow, ToDosValues, show }) => {
  const [complete, setShowComplete] = useState(false);
  return (
    <div className="indCard">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
        }}
      >
        <div
          style={{
            fontSize: "12px",
          }}
        >
          <p>Title : {single?.title}</p>
          <p>Description :{single?.desc}</p>
          <p>
            Create Date :{" "}
            <b>{moment(single?.createdAt).format("YYYY-MM-DD HH:mm")}</b>
          </p>
          <p>
            Completion Date :{" "}
            <b>{moment(single?.isFinished).format("YYYY-MM-DD")}</b>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <AiFillDelete
            style={{ cursor: "pointer" }}
            onClick={() => setShow(true)}
            data-toggle="tooltip"
            title="Delete Todo"
          />
          <FiCheckSquare
            style={{ cursor: "pointer" }}
            onClick={() => setShowComplete(true)}
            data-toggle="tooltip"
            title="Mark as Complete"
          />
        </div>
        <UserView
          show={complete}
          handleClose={() => setShowComplete(false)}
          text="Mark as Complete?"
          header="Confirm Modal"
          ActionDone={completeTask}
          id={single?.tid}
          CallUsers={ToDosValues}
        />
        <UserView
          show={show}
          handleClose={() => setShow(false)}
          text="You want to delete this Todo?"
          header="Delete Modal"
          ActionDone={deleteTodos}
          id={single?.tid}
          CallUsers={ToDosValues}
        />
      </div>
    </div>
  );
};
