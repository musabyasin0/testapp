import React, { useState, useEffect } from "react";

// Components

import "./App.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Content from "./components/content/content";
import AddItem from "./components/content/addItem";
import Search from "./components/content/search";

// Services

import apiRequest from "./services/apiRequest";

// Event Handling

function App() {
  const API_URL = "http://localhost:3500/items";
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data Not Found");
        const list = await response.json();
        setItems(list);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 4000);
  }, []);
  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 0;
    const newItem = { id, title: item, checked: false };
    const list = [...items, newItem];
    setItems(list);
    const postOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    };
    const result = await apiRequest(API_URL, postOption);
    if (result) setError(result);
  };
  const handleChange = async (id) => {
    const list = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(list);

    const itemUpdated = items.filter((item) => item.id === id);
    const updateOption = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked: !itemUpdated[0].checked }),
    };
    const reqURI = `${API_URL}/${id}`;
    const result = await apiRequest(reqURI, updateOption);
    if (result) setError(result);
  };
  const handleItemDelete = async (id) => {
    const list = items.filter((item) => item.id != id);
    setItems(list);

    const deleteOption = { method: "DELETE" };
    const reqURI = `${API_URL}/${id}`;
    const result = await apiRequest(reqURI, deleteOption);
    if (result) setError(result);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };
  return (
    <>
      <div
        style={{
          position: "fixed",
          zIndex: "-100",
          width: "100%",
          height: "100%",
          background: "black",
        }}
      ></div>
      <Header />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <Search search={search} setSearch={setSearch} />
      <main>
        {isLoading && (
          <div
            style={{
              background: "black",
              color: "lime",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              letterSpacing: "3px",
              transition: "0.3s all",
              animation: "loading 2s infinite",
            }}
          >
            <p style={{ padding: "20px" }}>Loading Data ... Please Wait ...</p>
          </div>
        )}
        {error && (
          <p
            className="err"
            style={{
              background: "black",
              color: "orangered",
              letterSpacing: "3px",
            }}
          >{`Error : ${error}`}</p>
        )}
        {!error && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.title.toLowerCase().includes(search.toLowerCase())
            )}
            handleChange={handleChange}
            handleItemDelete={handleItemDelete}
          />
        )}
      </main>
      <Footer error={error} isLoading={isLoading} />
    </>
  );
}

export default App;
