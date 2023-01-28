import React from "react";

import { FaTrash } from "react-icons/fa";

function Item({ item, handleChange, handleItemDelete }) {
  return (
    <>
      <li className="items">
        <input
          className="check form-check-input m-2"
          type="checkbox"
          checked={item.checked}
          onChange={() => handleChange(item.id)}
        />
        <label
          className="m-2"
          onDoubleClick={() => handleChange(item.id)}
          style={
            item.checked
              ? { background: "transparent", border: "1px solid silver" }
              : null
          }
        >
          {item.title}
        </label>
        <FaTrash
          role="button"
          onClick={() => handleItemDelete(item.id)}
          className="delete m-2"
        ></FaTrash>
      </li>
    </>
  );
}

export default Item;
