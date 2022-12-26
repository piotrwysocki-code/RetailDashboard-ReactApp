import React from "react";

function ButtonRounded(props) {
  return (
    <button
      className="rounded-xl w-full lg:w-fit bg-sky-200 hover:bg-sky-300 p-1 pl-2 pr-2"
      onClick={props.handleClick}
    >
      {props.text}
    </button>
  );
}

export default ButtonRounded;
