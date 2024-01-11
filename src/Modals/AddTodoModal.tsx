interface Props {
  modals: Boolean;
  setModal: React.Dispatch<React.SetStateAction<Boolean>>;
}
export const AddTodoModal = () => {
  
  return (
    <div id="myModal" className="modal">
      {/* <div className="modal-content">
        <div className="modal-header">
          <h2>ADD TODO TASK</h2>
        </div>

        <div className="modal-body">
          <input type="text" />
        </div>
        <div className="modal-body">
          <label htmlFor="user">Choose a User &nbsp;</label>
          <select name="user" id="user">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <div className="modal-footer">
          <button className="succ">Save</button> &nbsp; &nbsp;
          <button onClick={closeModal} className="succ">Close</button>
        </div>
      </div> */}
    </div>
  );
};
