import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Form = (props) => {
  const [value, setValue] = useState();
  const dispatch = useDispatch();

  const toggle = useSelector((state) => state.reducer.toggle);

  const getRandomNumber = () => {
    return Math.floor(Date.now() * Math.random(100)).toString();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (value === "") {
      alert("Kindly enter something in the text!");
      return;
    }
    if (props.action === "SUBTASK") {
      dispatch({
        type: "ADD_SUBTASK",
        payload: { data: value, id: props.id, subTask: [] },
      });
    } else {
      dispatch({
        type: "ADD_TODO",
        payload: { data: value, id: getRandomNumber(), subTask: [] },
      });
    }
  };

  const handleUpdate = () => {
    console.log("UPDATE");

    dispatch({
      type: "UPDATE_TODO",
      payload: value,
    });

    dispatch({
      type: "TOGGLE",
      payload: false,
    });
  };
  return (
    <div className="formContainer">
      <input className="formInput" style={{
        padding: props.id ? "10px" : "",
        fontSize: props.id ? "1rem" : ""
      }} onChange={handleChange} type="search" />
      {toggle ? (
        <button className="addBtn" title="UPDATE_TODO" onClick={handleUpdate}>
          UPDATE
        </button>
      ) : (
        <button className="addBtn" title="ADD TODO" onClick={handleSubmit}>
          {props.id ? "ADD" : "ADD TODO"}
        </button>
      )}
    </div>
  );
};

export default Form;
