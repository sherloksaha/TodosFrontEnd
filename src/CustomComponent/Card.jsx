import { useState } from "react";
import { AiFillDelete, AiTwotoneStop, AiFillEye } from "react-icons/ai";
import { UserView } from "../Modals/UserView";
import { useNavigate } from "react-router-dom";
import { deactiveUser, deleteUser } from "../Helper/User";
import { Badge } from "react-bootstrap";

export const Card = ({ data, id, CallUsers }) => {
  const nav = useNavigate();
  const [DeleteView, setDeleteView] = useState(false);
  const [showDeactive, setShowDeactive] = useState(false);

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
          <p>
            Name :{data.FirstName} {data?.LastName}
          </p>
          <p>
            Pending Task :{" "}
            {data?.Todos?.filter((e) => e?.isActive == true).length}
          </p>
          <p>
            Completed Task :
            {data?.Todos?.filter((e) => e?.isActive == false)?.length || 0}
          </p>
          <p>User Type : {data?.isAdmin ? "Admin" : "User"}</p>
          <Badge bg={data?.isActive ? "success" : "danger"}>
            {data?.isActive ? "Active" : "In-Active"}
          </Badge>
          {/* <p>Active Status : </p> */}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <AiFillEye
            style={{ cursor: "pointer" }}
            onClick={() => nav(`/todo/${data?.uid}`)}
            data-toggle="tooltip"
            title="View  Todo"
          />
          <AiFillDelete
            style={{ cursor: "pointer" }}
            onClick={() => setDeleteView(true)}
            data-toggle="tooltip"
            title="Delete User"
          />
          <AiTwotoneStop
            style={{
              cursor: "pointer",
              visibility: data?.isActive ? "visible" : "hidden",
            }}
            onClick={() => setShowDeactive(true)}
            data-toggle="tooltip"
            title="Deactive User"
          />
          <UserView
            show={showDeactive}
            handleClose={() => setShowDeactive(false)}
            text="You want to deactive this user?"
            header="Deactive Modal"
            ActionDone={deactiveUser}
            id={id}
            isActive={data?.isActive}
            CallUsers={CallUsers}
          />
          <UserView
            show={DeleteView}
            handleClose={() => setDeleteView(false)}
            text="You want to delete this user?"
            header="Delete Modal"
            ActionDone={deleteUser}
            id={id}
            CallUsers={CallUsers}
          />
        </div>
      </div>
    </div>
  );
};
