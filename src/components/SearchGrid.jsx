import React, { useEffect, useState } from "react";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { useStateContext } from "../context/ContextProvider";

function SearchGrid(props) {
  let { refreshData } = useStateContext();

  let [selected, setSelected] = useState([]);
  let [editItem, setEditItem] = useState({});
  let [editKey, setEditKey] = useState([]);
  let [editVal, setEditVal] = useState("");
  let [newItem, setNewItem] = useState({});


  useEffect(() => {
    console.log(editVal);
    console.log("edit item", editItem);
    console.log("new item", newItem);
    console.log(editKey);
  }, [editVal]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  let searchBtnClick = async () => {
  }

  let deleteBtnClicked = async () => {
    console.log("Sending selected items: ", selected);
    axios({
      url: `http://localhost:8080/delete_${props.urlSuffix}`,
      method: "delete",
      data: selected,
    })
      .then(
        await ((response) => {
          console.log(response);

          setEditKey([]);
          setEditItem({});
          setNewItem({});
          setEditVal("");
          setSelected([]);

          refreshData();

          console.log("refreshing...");
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };

  let checkboxTicked = (item) => {
    if (!selected.includes(item)) {
      setSelected([...selected, item]);
    } else {
      setSelected([
        ...selected.filter((temp) => {
          return temp.itemKey !== item.itemKey;
        }),
      ]);
    }
  };

  let editItemClick = (item, key) => {
    setEditVal(item[key]);
    setEditItem({ ...item });
    setNewItem({ ...item });
    setEditKey(key);
    return;
  };

  let handleChangeVal = (e) => {
    setEditVal(e.target.value);
    newItem[editKey] = e.target.value;
  };

  let handleInputBlur = async (e) => {
    console.log(editItem);

    console.log(newItem);

    axios({
      url: `http://localhost:8080/update_${props.urlSuffix}`,
      method: "put",
      data: { edit: editItem, new: newItem },
    })
      .then(
        await ((response) => {
          console.log(response);

          setEditKey([]);
          setEditItem({});
          setNewItem({});
          setEditVal("");

          refreshData();
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };

  let searchKeyChange = (e) => {
   /* setFilter((filter) => {
      return({
        ...filter,
        key: e.target.value
      });
    }); */  
  };

  let searchTermChange = (e) => {
  /*  setFilter((filter) => {
      return({
        ...filter,
        val: e.target.value
      });
    });*/
  };

  return (
    <div className="container text-start p-5 bg-slate-100 rounded-xl drop-shadow-md">
      <div className="container flex flex-row flex-wrap m-3 lg:gap-5">
        <div className="">
          <h1 className="text-lg">Search {props.title}</h1>
        </div>
        <div className="flex flex-row no-wrap gap-2 justify-end">
          <div className="flex flex-row gap-2 content-center">
            <input
              className="rounded-lg p-1"
              type="text"
              onChange={searchTermChange}
            ></input>
            <button
              className="bg-sky-200 rounded-lg p-1 pl-2 pr-2 hover:bg-sky-300"
              onClick={searchBtnClick}
            >
              <FiSearch />
            </button>
            <select onChange={searchKeyChange} className="rounded-xl">
              <option>search by</option>
              {props.data &&
                Object.keys(props.data[0] || "").map((key, index) => {
                  if (key !== "itemKey") {
                    return (
                      <option value={key} key={key}>
                        {key}
                      </option>
                    );
                  }
                })}
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-scroll max-h-screen lg:max-h-96">
        <table className="table-auto m-2 w-full">
          <tr className="sticky top-0 bg-slate-100">
            <th>
              <button
                className="rounded-xl bg-rose-200 hover:bg-red-100 p-1 mt-3 lg:mt-0"
                onClick={deleteBtnClicked}
              >
                <FiTrash2 />
              </button>
            </th>
            {props.data &&
              Object.keys(props.data[0] || "").map((item, index) => {
                if (item !== "itemKey") {
                  return (
                    <th className="font-thin " key={item}>
                      {item}
                    </th>
                  );
                }
              })}
          </tr>
          {props.data &&
            props.data.map((item, index) => {
              return (
                <tr
                  className={`border-b text-center ${
                    item.itemKey === editItem.itemKey
                      ? "bg-neutral-200"
                      : "bg-neutral-50"
                  } 
                    ${
                      selected.includes(item)
                        ? "bg-neutral-200 cursor-pointer"
                        : "bg-neutral-50"
                    }
                    hover:bg-neutral-200 cursor-pointer`}
                  key={item.itemKey}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      onClick={() => checkboxTicked(item)}
                    ></input>
                  </td>
                  {editItem.itemKey !== item.itemKey
                    ? Object.keys(item).map((key, index) => {
                        if (key !== "itemKey") {
                          return (
                            <td
                              key={key}
                              className="p-4"
                              onClick={() => {
                                editItemClick(item, key);
                              }}
                            >
                              {JSON.stringify(item[key]) || item[key]}
                            </td>
                          );
                        }
                      })
                    : Object.keys(editItem).map((key, index) => {
                        if (key === editKey) {
                          return (
                            <td
                              className="p-4"
                              onClick={() => {
                                editItemClick(item, key);
                              }}
                              key={key}
                            >
                              <input
                                className="text-center w-fit"
                                type="text"
                                value={editVal}
                                onChange={handleChangeVal}
                                onBlur={handleInputBlur}
                              />
                            </td>
                          );
                        } else {
                          return (
                            <td
                              className="p-4"
                              onClick={() => {
                                editItemClick(item, key);
                              }}
                              key={key}
                            >
                              {JSON.stringify(item[key]) || item[key]}
                            </td>
                          );
                        }
                      })}
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
}

export default SearchGrid;
