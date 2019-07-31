import React from "react";
import "./style.css";

//wrapper used to add elements to so we only return element
function Wrapper(props) {
  return <div className="wrapper">{props.children}</div>;
}

//make wrapper available to other modules
export default Wrapper;
