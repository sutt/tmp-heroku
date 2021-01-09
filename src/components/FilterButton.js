import React from "react";

function FilterButton(props) {
  return (
    <button 
      type="button" 
      className="btn toggle-btn" 
      aria-pressed={props.criteria[props.txt]}
      // aria-pressed={true}
      onClick={() => props.passCriteria(props.txt)}
      >
      <span className="visually-hidden">Show </span>
      <span>{props.txt} </span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;