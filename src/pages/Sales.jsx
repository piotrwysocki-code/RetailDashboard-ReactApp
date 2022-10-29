import React, { useEffect, useState, useRef } from "react";
import { useStateContext } from "../context/ContextProvider";
import SearchGrid from "../components/SearchGrid";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FiSearch } from "react-icons/fi";

function Sales() {
  const { sales, salesProducts, refreshSales, refreshSalesProducts } =
    useStateContext();

  let initialFilter = {
    key: -1,
    val: -1,
  };

  let [newSale, setNewSale] = useState({});
  let [newSaleProd, setNewSaleProd] = useState({});

  let [salesProdFilter, setSalesProdFilter] = useState(initialFilter);
  let [salesFilter, setSalesFilter] = useState(initialFilter);

  let salesProdSearchOps = useRef(-1);
  let salesSearchOps = useRef(-1);

  useEffect(() => {
    refreshSales();
    refreshSalesProducts();
  }, []);

  useEffect(() => {
    if (salesProducts[0]) {
      salesProdSearchOps.current = [];
      Object.keys(salesProducts[0] || "").map((key, index) => {
        if (key !== "itemKey") {
          salesProdSearchOps.current.push(key);
        }
      });
    }
  }, [salesProducts]);

  useEffect(() => {
    if (sales[0]) {
      salesSearchOps.current = [];
      Object.keys(sales[0] || "").map((key, index) => {
        if (key !== "itemKey") {
          salesSearchOps.current.push(key);
        }
      });
    }
  }, [sales]);

  useEffect(() => {
    console.log(salesProdFilter);
    refreshSalesProducts(salesProdFilter);
  }, [salesProdFilter]);

  useEffect(() => {
    console.log(salesFilter);
    refreshSales(salesFilter);
  }, [salesFilter]);

  let handleChangeProds = (e) => {
    setNewSaleProd({
      ...newSaleProd,
      [e.target.name]: e.target.value,
    });
    console.log("new sale prod:", newSaleProd);
  };

  let handleChangeSale = async (e) => {
    setNewSale({
      ...newSale,
      [e.target.name]: e.target.value,
    });
    console.log("new sale", newSale);
  };

  let handleSubmitSale = async (event) => {
    axios
      .post(
        "https://us-central1-dashboard-api-c543e.cloudfunctions.net/app/add_sale",
        newSale
      )
      .then((response) => {
        console.log(response);
        refreshSales();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let handleSubmitSalesProd = async (event) => {
    axios
      .post(
        "https://us-central1-dashboard-api-c543e.cloudfunctions.net/app/add_salesprod",
        newSaleProd
      )
      .then((response) => {
        console.log(response);
        refreshSalesProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let searchBtnClick = async (x) => {
    if (x === 0) {
      refreshSalesProducts(salesProdFilter);
      console.log(salesProdFilter);
    } else if (x === 1) {
      refreshSales(salesFilter);
      console.log(salesFilter);
    }
  };

  let searchKeyChange = (e) => {
    console.log(e.target.name + ": " + e.target.value);
    if (e.target.name === "salesProdKey") {
      setSalesProdFilter({
        ...salesProdFilter,
        key: e.target.value,
      });
    } else if (e.target.name === "salesKey") {
      setSalesFilter({
        ...salesFilter,
        key: e.target.value,
      });
    }
  };

  let searchTermChange = (e) => {
    console.log(e.target.name + ": " + e.target.value);
    if (e.target.name === "salesProdVal") {
      setSalesProdFilter({
        ...salesProdFilter,
        val: e.target.value,
      });
    } else if (e.target.name === "salesVal") {
      setSalesFilter({
        ...salesFilter,
        val: e.target.value,
      });
    }
  };

  return (
    <div className="w-screen h-screen overflow-y-scroll overflow-x-hidden bg-gradient-to-r from-cyan-200 to-indigo-200 ...">
      <Navbar selectedMenu={2} />
      <div className="container ">
        <div className="bg-sky-50 md:m-10 mt-24 p-2 md:p-10 bg-t rounded-xl drop-shadow-md">
          <h1 className="m-6 text-4xl tracking-wider">Sales</h1>
          <div className="bg-sky-100 rounded-xl p-5 flex flex-col gap-5">
            <div className="container flex flex-col lg:flex-row gap-5">
              <div className="container bg-slate-100 rounded-lg p-5 drop-shadow-md xl:w-1/2">
                <h1 className="text-2xl mb-2">New Sale</h1>
                <form className="container flex flex-col gap-2 items-start content-center">
                  <label for="saleDate" className="w-full">
                    Sale Date
                  </label>
                  <input
                    type="date"
                    name="saleDate"
                    className="w-full p-1 rounded-lg"
                    onChange={handleChangeSale}
                  ></input>
                  <label for="total" className=" w-full">
                    Total
                  </label>
                  <input
                    type="number"
                    name="total"
                    className="w-full p-1 rounded-lg"
                    onChange={handleChangeSale}
                  ></input>
                  <label for="employeeId" className=" w-full">
                    Employee ID
                  </label>
                  <input
                    type="number"
                    name="employeeId"
                    className="w-full p-1 rounded-lg"
                    onChange={handleChangeSale}
                  ></input>
                </form>
                <div className="flex flex-col justify-end gap-5 lg:flex-row content-centerd m-3">
                  <button
                    className="rounded-xl bg-sky-200 hover:bg-sky-300 p-1 pl-2 pr-2 mt-2"
                    onClick={handleSubmitSale}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="container text-start p-5 bg-slate-100 rounded-xl drop-shadow-md flex flex-col xl:w-1/2">
                <h1 className="text-xl mb-2">New Sales Product</h1>
                <div className="flex flex-col justify-start gap-3 flex-wrap">
                  <div className="w-full flex flex-col lg:flex-row justify-between">
                    <label for="saleId">SaleID</label>
                    <input
                      type="number"
                      name="saleId"
                      onChange={handleChangeProds}
                      className="p-1 rounded-lg w-full lg:w-1/2"
                    ></input>
                  </div>
                  <div className="w-full flex flex-col lg:flex-row justify-between">
                    <label for="productId">ProductID</label>
                    <input
                      type="number"
                      name="productId"
                      onChange={handleChangeProds}
                      className="p-1 rounded-lg w-full lg:w-1/2"
                    ></input>
                  </div>
                  <div className="w-full flex flex-col lg:flex-row justify-between">
                    <label for="quantity">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      onChange={handleChangeProds}
                      className="p-1 rounded-lg w-full lg:w-1/2"
                    ></input>
                  </div>
                </div>
                <button
                  className="rounded-xl bg-sky-200 hover:bg-sky-300 p-1 pl-2 pr-2 mt-5 lg:w-fit"
                  onClick={handleSubmitSalesProd}
                >
                  Submit
                </button>
              </div>
              <div className="container flex flex-col gap-5 w-full xl:w-1/2">
                <div className="container text-start p-2 bg-slate-100 rounded-xl drop-shadow-md">
                  <div className="container flex flex-row flex-wrap m-3 gap-5">
                    <div className="">
                      <h1 className="text-lg">Search Sold Products</h1>
                    </div>
                    <div className="flex flex-row flex-wrap gap-2 content-center">
                      <select
                        name="salesProdKey"
                        onChange={searchKeyChange}
                        className="rounded-lg p-1"
                      >
                        <option>key</option>
                        {salesProdSearchOps.current !== -1 &&
                          salesProdSearchOps.current.map((key, index) => {
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
                          name="salesProdVal"
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
                  <SearchGrid data={salesProducts} urlSuffix="salesprod" />
                </div>
              </div>
            </div>
            <div className="container text-start p-2 bg-slate-100 rounded-xl drop-shadow-md">
              <div className="container flex flex-row flex-wrap m-3 gap-5">
                <div className="">
                  <h1 className="text-lg">Search Sales</h1>
                </div>
                <div className="flex flex-row flex-wrap gap-2 content-center">
                  <select
                    name="salesKey"
                    onChange={searchKeyChange}
                    className="rounded-lg p-1"
                  >
                    <option>key</option>
                    {salesSearchOps.current !== -1 &&
                      salesSearchOps.current.map((key, index) => {
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
                      name="salesVal"
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
              <SearchGrid data={sales} urlSuffix="sale" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sales;
