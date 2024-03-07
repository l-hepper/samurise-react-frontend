import React from "react";
import { useState, useRef, useEffect } from "react";

import "./tasklist.css";

// for debugging use
const dummyTaskList = [
  "Git Course - Complete Section 5",
  "Complete Anki Review",
  "3 LeetCode Problems",
];

export default function TaskList() {
  const [taskList, setTaskList] = useState(dummyTaskList);
  const [addNewTaskMode, setAddNewTaskMode] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (addNewTaskMode) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [addNewTaskMode]);

  // keyboard shortcut function for adding a new task quickly
  useEffect(() => {
    function handleKeyPress(event) {
      if (event.ctrlKey && event.key === "Enter") {
        setAddNewTaskMode((previousState) => (previousState = true));
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // add a new task to the list
  function addTask(event) {
    if (event.key === "Enter" || event.type === "blur") {
      const newTask = event.target.value;
      const modifiedTaskList = [...taskList];
      modifiedTaskList.push(newTask);
      setTaskList(modifiedTaskList);
      setAddNewTaskMode((previousState) => (previousState = false));
    }
  }

  // input element to be conditionally display for when the user adds a new task
  const input = (
    <input
      onKeyDown={addTask}
      onBlur={addTask}
      type="text"
      ref={inputRef}
    ></input>
  );

  return (
    <div class="tasklist-section">
      <p class="tasklist-section-label">Task List</p>
      <div class="tasklist-controls">
        <button
          onClick={() =>
            setAddNewTaskMode((previousState) => (previousState = true))
          }
        >
          Add
        </button>
      </div>
      <div class="task">
        <p>TimeBlock name goes here</p>
        <ul>
          {taskList.map((item) => (
            <li>{item}</li>
          ))}
          {addNewTaskMode && <li>{input}</li>}
        </ul>
      </div>
    </div>
  );
}
