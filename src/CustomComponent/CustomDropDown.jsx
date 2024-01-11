import React from "react";
import { Dropdown } from "react-bootstrap";

export const CustomDropDown = ({ dropDownName, DropDownKeys }) => {
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {dropDownName}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {DropDownKeys?.map((el, ind) => (
            <Dropdown.Item
              name={el?.value}
              key={ind}
              onClick={(e) => {
                el.fun && el.fun(e);
              }}
            >
              {el?.value}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
