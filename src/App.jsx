import React, { useContext } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { LogIn } from "./LogIn";
import { Home } from "./Page/Home";
import { Register } from "./Page/Register";
import { Todo } from "./Page/Todo";
import { LayOut } from "./Page/LayOut";
import { CreateUser } from "./Page/CreateUser";
import { CreateTask } from "./Page/CreateTask";
import { ResetPass } from "./ResetPass";
import { AuthContext } from "./context/authContext";
import { Kk } from "./Page/Kk";
import { Jj } from "./Page/JJ";

const PermissionAccess = ({ children, currentUser }) => {
  if (currentUser?.isAdmin) {
    return children;
  } else {
    return <Navigate to="*" replace />;
  }
};
export const App = () => {
  const { currentUser } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LogIn />,
    },
    {
      path: "/register",
      element: (
        <PermissionAccess currentUser={currentUser}>
          <Register />
        </PermissionAccess>
      ),
    },
    {
      path: "/",
      element: <LayOut />,
      children: currentUser?.isAdmin
        ? [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/todo/:id",
              element: <Todo />,
            },
            {
              path: "/k",
              element: <Kk />,
            },
          ]
        : [
            {
              path: "/home",
              element: <Todo />,
            },
            {
              path: "/k",
              element: <Jj/>,
            },
          ],
    },
    {
      path: "/create-user",
      element: (
        <PermissionAccess currentUser={currentUser}>
          <CreateUser />
        </PermissionAccess>
      ),
    },
    {
      path: "/reset-password",
      element: <ResetPass />,
    },
    {
      path: "/create-task",
      element: <CreateTask />,
    },
    {
      path: "*",
      element: <p>Sorry No Route Found</p>,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
