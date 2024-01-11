import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface Props {
  modals:Boolean;
  setModal:React.Dispatch<React.SetStateAction<Boolean>>
}

export const AddUserModal = ({ modals,setModal }: Props) => {
  return (
    
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add User</h2>
        </div>

        <div className="modal-body">
          <label htmlFor="user">User Name</label>
          <br />
          <input type="text" />
        </div>
        <div className="modal-body">
          <label htmlFor="user">Email</label>
          <br />
          <input type="text" />
        </div>
        <div className="modal-body">
          <label htmlFor="user">Name</label>
          <br />
          <input type="text" />
        </div>

        <div className="modal-body">
          <label htmlFor="user">Email&nbsp;</label>
          <br />
          <input type="text" />
        </div>
        <div className="modal-body">
          <label htmlFor="user">Choose a User &nbsp;</label>
          <select name="user" id="user">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
          </select>
        </div>
        <div className="modal-footer">
          <button className="succ">Save</button> &nbsp; &nbsp;
          <button className="succ" onClick={() => setModal(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
