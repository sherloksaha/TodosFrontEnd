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
          display: "flex",
          // maxWidth:"200px",
          width:"100%",
          justifyContent:'space-between',
        
        }}
      >
        <div
          style={{
            display:'flex',
            flexDirection:'column',
            flexWrap:'wrap',
            fontSize: "12px",
            
          }}
        >
          <p><b>Title : </b>{single?.title}</p>
          <p><span><b>Description :</b></span> { single?.desc}</p>
          <p>
            <b>Create Date :</b>{" "}
            <b>{moment(single?.createdAt).format("YYYY-MM-DD HH:mm")}</b>
          </p>
          <p>
            <b>Completion Date :</b>{" "}
            <b>{moment(single?.isFinished).format("YYYY-MM-DD")}</b>
          </p>
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
      <div
          style={{
            position:'absolute',
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            top:"12px",
            right:"15px",
            float:"right"
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
    </div>
  );
};
