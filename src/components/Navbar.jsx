import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const activeClass = `bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium block`;
const inactiveClass = `text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium block`;

function Navbar(props) {
  let [showNav, setShowNav] = useState(false);

  return (
    <nav class="bg-gray-800">
      <div class="mx-auto w-screen px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="block h-6 w-6"
                onClick={() => {
                  setShowNav(!showNav);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
              <img
                class="block h-8 w-auto lg:hidden"
                src="../../pwlogo.png"
                alt="PWLogo"
              />
              <img
                class="hidden h-8 w-auto lg:block"
                src="../../pwlogo.png"
                alt="PWLogo"
              />
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <a
                  className={
                    props.selectedMenu == 0 ? activeClass : inactiveClass
                  }
                >
                  <Link to="/">Employees</Link>
                </a>
                <a
                  className={
                    props.selectedMenu == 1 ? activeClass : inactiveClass
                  }
                >
                  <Link to="/products">Products</Link>
                </a>
                <a
                  className={
                    props.selectedMenu == 2 ? activeClass : inactiveClass
                  }
                >
                  <Link to="/sales">Sales</Link>
                </a>
              </div>
            </div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
        </div>
      </div>

      {showNav ? (
        <div class="sm:hidden" id="mobile-menu">
          <div class="space-y-1 px-2 pt-2 pb-3">
            <a
              className={props.selectedMenu == 0 ? activeClass : inactiveClass}
            >
              <Link to="/">Employees</Link>
            </a>
            <a
              className={props.selectedMenu == 1 ? activeClass : inactiveClass}
            >
              <Link to="/products">Products</Link>
            </a>
            <a
              className={props.selectedMenu == 2 ? activeClass : inactiveClass}
            >
              <Link to="/sales">Sales</Link>
            </a>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

export default Navbar;
