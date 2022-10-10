import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import SearchGrid from "../components/SearchGrid";
import axios from "axios";
import Navbar from "../components/Navbar";

function Employees() {
  const { employees, departments, refreshEmployees, refreshDepartments } =
    useStateContext();

  let [name, setName] = useState("");

  let [newEmp, setNewEmp] = useState({});

  useEffect(() => {
    refreshEmployees();
    refreshDepartments();
  }, []);

  let handleChange = (event) => {
    setName(event.target.value);
    console.log(name);
  };

  let handleSubmitDept = async (event) => {
    axios({
      url: "http://localhost:8080/add_department",
      method: "post",
      data: { name: name },
    })
      .then(
        await ((response) => {
          console.log("test", response);
          refreshDepartments();
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };

  let handleSubmitEmp = async (event) => {
    newEmp["employeeId"] = 0;
    axios
      .post("http://localhost:8080/add_employee", newEmp)
      .then((response) => {
        console.log(response);
        refreshEmployees();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let handleEmpChange = async (e) => {
    newEmp[e.target.name] = e.target.value;
    console.log(newEmp);
  };

  return (
    <div className="w-screen h-screen overflow-y-scroll overflow-x-hidden bg-gradient-to-r from-cyan-200 to-indigo-200 ...">
      <Navbar selectedMenu={0} />
      <div className="container">
        <div className="bg-sky-50 md:m-10 mt-24 p-2 md:p-10 bg-t rounded-xl drop-shadow-md">
          <h1 className="m-6 text-4xl tracking-wider">Employees</h1>
          <div className="bg-sky-100 rounded-xl p-5 flex flex-col gap-5">
            <div className="container flex flex-col lg:flex-row gap-5">
              <div className="container bg-slate-100 rounded-lg p-5 drop-shadow-md w-full lg:w-1/2">
                <h1 className="text-2xl mb-5">New Employee</h1>
                <form className="container flex flex-col gap-2 items-start content-center">
                  <label for="firstName" className="w-full">
                    First Name
                  </label>
                  <input
                    type="type"
                    name="firstName"
                    className="w-full p-1 rounded-lg"
                    onChange={handleEmpChange}
                  ></input>
                  <label for="lastName" className=" w-full">
                    Last Name
                  </label>
                  <input
                    type="type"
                    name="lastName"
                    className="w-full p-1 rounded-lg"
                    onChange={handleEmpChange}
                  ></input>
                  <label for="deptId" className=" w-full">
                    Department
                  </label>
                  <select
                    name="deptId"
                    id="deptId"
                    className="w-full text-center rounded-lg p-1"
                    onChange={handleEmpChange}
                  >
                    <option value=""></option>

                    {departments.map((item, index) => {
                      return (
                        <option value={item.deptId}>
                          {item.deptId} - {item.deptName}
                        </option>
                      );
                    })}
                  </select>
                  <label for="salary" className=" w-full">
                    Salary
                  </label>
                  <input
                    type="number"
                    name="salary"
                    className="w-full p-1 rounded-lg"
                    onChange={handleEmpChange}
                  ></input>
                  <label for="province" className="w-full">
                    Province
                  </label>
                  <select
                    name="province"
                    className="w-full p-1 rounded-lg"
                    onChange={handleEmpChange}
                  >
                    <option value=""></option>
                    <option value="NL">NL</option>
                    <option value="PE">PE</option>
                    <option value="NS">NS</option>
                    <option value="NB">NB</option>
                    <option value="QC">QC</option>
                    <option value="ON">ON</option>
                    <option value="MB">MB</option>
                    <option value="SK">SK</option>
                    <option value="AB">AB</option>
                    <option value="BC">BC</option>
                    <option value="YT">YT</option>
                    <option value="NT">NT</option>
                    <option value="NU">NU</option>
                  </select>
                  <label for="city" className="w-full">
                    City
                  </label>
                  <input
                    type="type"
                    name="city"
                    className="w-full p-1 rounded-lg"
                    onChange={handleEmpChange}
                  ></input>
                </form>
                <div className="flex flex-col justify-end gap-5 lg:flex-row content-centerd m-3">
                  <button
                    className="rounded-xl bg-sky-200 hover:bg-sky-300 p-1 pl-2 pr-2 mt-2"
                    onClick={handleSubmitEmp}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="container flex flex-col gap-5 w-full lg:w-1/2">
                <div className="container text-start p-5 bg-slate-100 rounded-xl drop-shadow-md">
                  <h1 className="text-xl mb-2">New Department</h1>
                  <div className="flex flex-col justify-end gap-3 lg:flex-row content-center">
                    <label for="deptName">Name</label>
                    <input
                      type="text"
                      name="deptName"
                      onChange={handleChange}
                      className="w-full lg:w-fit p-1 rounded-lg"
                    ></input>
                    <button
                      className="rounded-xl bg-sky-200 hover:bg-sky-300 p-1 pl-2 pr-2"
                      onClick={handleSubmitDept}
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <div className="">
                  <SearchGrid
                    data={departments}
                    title="Departments"
                    urlSuffix="department"
                  />
                </div>
              </div>
            </div>
            <SearchGrid
              data={employees}
              title="Employees"
              urlSuffix="employee"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employees;
