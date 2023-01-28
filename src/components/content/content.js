import React from "react";

import Item from "./item";

import "./content.css";

const Content = ({ items, handleChange, handleItemDelete }) => {
  return items.length ? (
    <>
      <ul className="itemList">
        <label>Item List</label>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleChange={handleChange}
            handleItemDelete={handleItemDelete}
          />
        ))}
      </ul>
    </>
  ) : (
    <ul
      style={{
        justifyContent: "center",
        color: "red",
        fontFamily: "cursive",
        letterSpacing: "2px",
      }}
      className="itemList"
    >
      <marquee>Shopping List Is Empty</marquee>
    </ul>
  );
};

export default Content;
 