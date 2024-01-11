import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
interface Props {
  show: Boolean;
  setShow: React.Dispatch<React.SetStateAction<Boolean>>;
  children:string | JSX.Element | JSX.Element[] 
}
export const UserDeleteModal = ({ show, setShow,children }: Props) => {
  return (
    <div
      className="modal show"
      style={{ display: show ? "block" : "none", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Body>
         {children}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShow(false)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};
