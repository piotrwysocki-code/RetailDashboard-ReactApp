import React, { useState, useEffect } from "react";
import { useStateContext } from "../context/ContextProvider";
import Navbar from "../components/Navbar";

function Home() {
  const { categories, setCategories, refreshCategories } = useStateContext();

  useEffect(() => {
    refreshCategories();
  }, []);

  return (
    <div className="w-screen">
      <Navbar selectedMenu={0} />
      <div className="container">
        {categories.map((item, index) => {
          return <h1 key={index}>{JSON.stringify(item)}</h1>;
        })}
      </div>
    </div>
  );
}

export default Home;
