import React, { useEffect, useState, useRef } from "react";
import { useStateContext } from "../context/ContextProvider";
import SearchGrid from "../components/SearchGrid";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FiSearch } from "react-icons/fi";

function Products() {
  const { products, categories, refreshProducts, refreshCategories } =
    useStateContext();

  let [name, setName] = useState("");
  let [newProd, setNewProd] = useState({});

  useEffect(() => {
    refreshProducts();
    refreshCategories();
  }, []);

  let handleChange = (event) => {
    setName(event.target.value);
    console.log(name);
  };

  let handleProdChange = async (e) => {
    newProd[e.target.name] = e.target.value;
    console.log(newProd);
  };

  let handleSubmitProduct = async (event) => {
    newProd["productId"] = 0;
    axios
      .post("http://localhost:8080/add_product", newProd)
      .then((response) => {
        console.log(response);
        refreshProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let handleSubmitCategory = async (event) => {
    axios({
      url: "http://localhost:8080/add_category",
      method: "post",
      data: { name: name },
    })
      .then(
        await ((response) => {
          console.log("test", response);
          refreshCategories();
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-screen h-screen overflow-y-scroll overflow-x-hidden bg-gradient-to-r from-cyan-200 to-indigo-200 ...">
      <Navbar selectedMenu={1} />
      <div className="container">
        <div className="bg-sky-50 md:m-10 mt-24 p-2 md:p-10 bg-t rounded-xl drop-shadow-md">
          <h1 className="m-6 text-4xl tracking-wider">Products</h1>
          <div className="bg-sky-100 rounded-xl p-5 flex flex-col gap-5">
            <div className="container flex flex-col lg:flex-row gap-5">
              <div className="container bg-slate-100 rounded-lg p-5 drop-shadow-md w-full lg:w-1/2">
                <h1 className="text-2xl mb-2">New Product</h1>
                <form className="container flex flex-col gap-2 items-start content-center">
                  <label for="productName" className="w-full">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    className="w-full p-1 rounded-lg"
                    onChange={handleProdChange}
                  ></input>
                  <label for="price" className=" w-full">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    className="w-full p-1 rounded-lg"
                    onChange={handleProdChange}
                  ></input>
                  <label for="categoryId" className=" w-full">
                    Category Id
                  </label>
                  <select
                    name="categoryId"
                    id="categoryId"
                    className="w-full text-center rounded-lg p-1"
                    onChange={handleProdChange}
                  >
                    <option value=""></option>
                    {categories.map((item, index) => {
                      return (
                        <option value={item.categoryId}>
                          {item.categoryId} - {item.categoryName}
                        </option>
                      );
                    })}
                  </select>
                </form>
                <div className="flex flex-col justify-end gap-5 lg:flex-row content-centerd m-3">
                  <button
                    className="rounded-xl bg-sky-200 hover:bg-sky-300 p-1 pl-2 pr-2"
                    onClick={handleSubmitProduct}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="container flex flex-col gap-5 w-full lg:w-1/2">
                <div className="container text-start p-5 bg-slate-100 rounded-xl drop-shadow-md">
                  <h1 className="text-xl mb-2">New Category</h1>
                  <div className="flex flex-col justify-end gap-3 lg:flex-row content-center">
                    <label for="deptName">Name</label>
                    <input
                      type="text"
                      name="deptName"
                      onChange={handleChange}
                      className="w-full lg:w-fit p-1 rounded-lg"
                    ></input>
                    <button
                      className="rounded-xl bg-sky-200 hover:bg-sky-300 p-1 pl-2 pr-2 mt-3 lg:mt-0"
                      onClick={handleSubmitCategory}
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <div className="">
                  <SearchGrid
                    data={categories}
                    title="Categories"
                    urlSuffix="category"
                  />
                </div>
              </div>
            </div>

            <div>
              <SearchGrid
                data={products}
                title="Products"
                urlSuffix="product"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
