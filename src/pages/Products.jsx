import React, { useEffect, useState, useRef } from "react";
import { useStateContext } from "../context/ContextProvider";
import SearchGrid from "../components/SearchGrid";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FiSearch } from "react-icons/fi";
import ButtonRounded from "../components/ButtonRounded";

function Products() {
  const { products, categories, refreshProducts, refreshCategories } =
    useStateContext();

  let initialFilter = {
    key: -1,
    val: -1,
  };

  let [name, setName] = useState("");
  let [newProd, setNewProd] = useState({});

  let [prodFilter, setProdFilter] = useState(initialFilter);
  let [catFilter, setCatFilter] = useState(initialFilter);

  let prodSearchOps = useRef(-1);
  let catSearchOps = useRef(-1);

  useEffect(() => {
    refreshProducts();
    refreshCategories();
  }, []);

  useEffect(() => {
    if (categories[0]) {
      catSearchOps.current = [];
      Object.keys(categories[0] || "").map((key, index) => {
        if (key !== "itemKey" && key !== "products") {
          catSearchOps.current.push(key);
        }
      });
    }
  }, [categories]);

  useEffect(() => {
    if (products[0]) {
      prodSearchOps.current = [];
      Object.keys(products[0] || "").map((key, index) => {
        if (key !== "itemKey" && key !== "category") {
          prodSearchOps.current.push(key);
        }
      });
    }
  }, [products]);

  useEffect(() => {
    console.log(catFilter);
    refreshCategories(catFilter);
  }, [catFilter]);

  useEffect(() => {
    console.log(prodFilter);
    refreshProducts(prodFilter);
  }, [prodFilter]);

  let handleChange = (event) => {
    setName(event.target.value);
    console.log(name);
  };

  let handleProdChange = async (e) => {
    setNewProd({
      ...newProd,
      [e.target.name]: e.target.value,
    });
    console.log(newProd);
  };

  let handleSubmitProduct = async (event) => {
    newProd["productId"] = 0;
    axios
      .post(
        "https://us-central1-dashboard-api-c543e.cloudfunctions.net/app/add_product",
        newProd
      )
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
      url: "https://us-central1-dashboard-api-c543e.cloudfunctions.net/app/add_category",
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

  let searchBtnClick = async (x) => {
    if (x === 0) {
      refreshCategories(catFilter);
      console.log(catFilter);
    } else if (x === 1) {
      refreshProducts(prodFilter);
      console.log(prodFilter);
    }
  };

  let searchKeyChange = (e) => {
    console.log(e.target.name + ": " + e.target.value);
    if (e.target.name === "catKey") {
      setCatFilter({
        ...catFilter,
        key: e.target.value,
      });
    } else if (e.target.name === "prodKey") {
      setProdFilter({
        ...prodFilter,
        key: e.target.value,
      });
    }
  };

  let searchTermChange = (e) => {
    console.log(e.target.name + ": " + e.target.value);
    if (e.target.name === "catVal") {
      setCatFilter({
        ...catFilter,
        val: e.target.value,
      });
    } else if (e.target.name === "prodVal") {
      setProdFilter({
        ...prodFilter,
        val: e.target.value,
      });
    }
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
                  <ButtonRounded
                    text="Submit"
                    handleClick={handleSubmitProduct}
                  />
                </div>
              </div>
              <div className="container flex flex-col gap-5 w-full lg:w-1/2">
                <div className="container text-start p-5 bg-slate-100 rounded-xl drop-shadow-md">
                  <h1 className="text-2xl mb-2">New Category</h1>
                  <div className="flex flex-col justify-end gap-3 lg:flex-row content-center">
                    <label for="deptName">Name</label>
                    <input
                      type="text"
                      name="deptName"
                      onChange={handleChange}
                      className="w-full lg:w-fit p-1 rounded-lg"
                    ></input>
                    <ButtonRounded
                      text="Submit"
                      handleClick={handleSubmitCategory}
                    />
                  </div>
                </div>

                <div className="container text-start p-2 bg-slate-100 rounded-xl drop-shadow-md">
                  <div className="container flex flex-row flex-wrap m-3 gap-5">
                    <div className="">
                      <h1 className="text-lg">Search Categories</h1>
                    </div>
                    <div className="flex flex-row flex-wrap gap-2 content-center">
                      <select
                        name="catKey"
                        onChange={searchKeyChange}
                        className="rounded-lg p-1"
                      >
                        <option>Select filter</option>
                        {catSearchOps.current !== -1 &&
                          catSearchOps.current.map((key, index) => {
                            if (key !== "itemKey") {
                              return (
                                <option value={key} key={key}>
                                  {key}
                                </option>
                              );
                            }
                          })}
                      </select>
                      <div className="flex flex-row items-stretch gap-2">
                        <input
                          className="rounded-lg p-1"
                          type="text"
                          name="catVal"
                          onChange={searchTermChange}
                        ></input>
                        <button
                          className="bg-sky-200 rounded-lg p-1 pl-2 pr-2 hover:bg-sky-300"
                          onClick={() => {
                            searchBtnClick(0);
                          }}
                        >
                          <FiSearch />
                        </button>
                      </div>
                    </div>
                  </div>
                  <SearchGrid data={categories} urlSuffix="category" />
                </div>
              </div>
            </div>

            <div className="container text-start p-2 bg-slate-100 rounded-xl drop-shadow-md">
              <div className="container flex flex-row flex-wrap m-3 gap-5">
                <div className="">
                  <h1 className="text-lg">Search Products</h1>
                </div>
                <div className="flex flex-row flex-wrap gap-2 content-center">
                  <select
                    name="prodKey"
                    onChange={searchKeyChange}
                    className="rounded-lg p-1"
                  >
                    <option>Select filter</option>
                    {prodSearchOps.current !== -1 &&
                      prodSearchOps.current.map((key, index) => {
                        if (key !== "itemKey") {
                          return (
                            <option value={key} key={key}>
                              {key}
                            </option>
                          );
                        }
                      })}
                  </select>
                  <div className="flex flex-row items-stretch gap-2">
                    <input
                      className="rounded-lg p-1"
                      type="text"
                      name="prodVal"
                      onChange={searchTermChange}
                    ></input>
                    <button
                      className="bg-sky-200 rounded-lg p-1 pl-2 pr-2 hover:bg-sky-300"
                      onClick={() => {
                        searchBtnClick(0);
                      }}
                    >
                      <FiSearch />
                    </button>
                  </div>
                </div>
              </div>
              <SearchGrid data={products} urlSuffix="product" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
