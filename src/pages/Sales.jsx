import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import SearchGrid from "../components/SearchGrid";
import axios from "axios";
import Navbar from "../components/Navbar";

function Sales() {
  const { sales, salesProducts, refreshSales, refreshSalesProducts } =
    useStateContext();

  let [newSale, setNewSale] = useState({});
  let [newSaleProd, setNewSaleProd] = useState({});

  useEffect(() => {
    refreshSales();
    refreshSalesProducts();
  }, []);

  let handleChangeProds = (e) => {
    newSaleProd[e.target.name] = e.target.value;
    console.log("new sale prod:", newSaleProd);
  };

  let handleChangeSale = async (e) => {
    newSale[e.target.name] = e.target.value;
    console.log("new sale", newSale);
  };

  let handleSubmitSale = async (event) => {
    newSale["saleId"] = 0;
    axios
      .post("http://localhost:8080/add_sale", newSale)
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
      .post("http://localhost:8080/add_salesprod", newSaleProd)
      .then((response) => {
        console.log(response);
        refreshSalesProducts();
      })
      .catch((error) => {
        console.log(error);
      });
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
                <div className="">
                  <SearchGrid
                    data={salesProducts}
                    title="Sold Products"
                    urlSuffix="salesprod"
                  />
                </div>
              </div>
            </div>
            <SearchGrid data={sales} title="Sales" urlSuffix="sale" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sales;
