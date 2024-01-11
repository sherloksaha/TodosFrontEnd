import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { apiClient } from "../config/apiConfig";
export const UserView = ({
  show,
  handleClose,
  text,
  header,
  ActionDone,
  id,
  CallUsers,
  isActive=""
}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={() => ActionDone(id,CallUsers,handleClose,isActive)}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
