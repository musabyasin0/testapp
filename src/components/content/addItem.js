import React, { useRef } from "react";

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
  const inputRef = useRef();
  return (
    <form className="addItem" onSubmit={handleSubmit}>
      <label htmlFor="itemName">Add Item</label>
      <input
        className="itemName"
        id="addItem"
        placeholder="Type Item Name"
        required
        autoFocus
        ref={inputRef}
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button
        onClick={() => inputRef.current.focus()}
        className="formButton"
        type="submit"
      >
        +
      </button>
    </form>
  );
};

export default AddItem;
