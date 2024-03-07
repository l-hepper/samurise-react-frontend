import React from "react";
import { useState, useRef, useEffect } from "react";

import "./tasklist.css";

// for debugging use
const dummyTaskList = [
  { name: "Git Course - complete section 5", complete: false },
  { name: "LeetCode 5 questions", complete: false },
  { name: "Update resume with samurise", complete: false },
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
      if (!event.target.value) {
        setAddNewTaskMode((previousState) => (previousState = false));
        return;
      }

      const newTaskName = event.target.value;
      const newTask = { name: newTaskName, complete: false };
      const modifiedTaskList = [...taskList];
      modifiedTaskList.push(newTask);
      setTaskList(modifiedTaskList);
      setAddNewTaskMode((previousState) => (previousState = false));
    }
  }

  // uses the index of a task item to get from task array and flip its complete flag
  function markTaskItemAsCompleteOrNotComplete(index) {
    let modifiedTaskList = [...taskList];
    let modifiedTaskItem = modifiedTaskList[index];
    modifiedTaskItem = {
      ...modifiedTaskItem,
      complete: !modifiedTaskItem.complete,
    };
    modifiedTaskList[index] = modifiedTaskItem;
    setTaskList(modifiedTaskList);
  }

  function removeTaskItem(index) {
    let modifiedTaskList = [...taskList];
    modifiedTaskList.splice(index, 1);
    setTaskList(modifiedTaskList);
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
      <div class="tasklist-controls"></div>
      <div class="task-content">
        <p>TimeBlock name goes here</p>
        <ul>
          {taskList.map((item, index) => (
            <li
              key={item.name}
              onClick={() => markTaskItemAsCompleteOrNotComplete(index)}
              onDoubleClick={() => removeTaskItem(index)}
              className={"tasklist-item" + (item.complete ? " complete" : "")}
            >
              <span>{item.name}</span>
            </li>
          ))}
          {addNewTaskMode ? (
            <li>{input}</li>
          ) : (
            <button className="add-taskitem-button"
              onClick={() =>
                setAddNewTaskMode((previousState) => (previousState = true))
              }
            >
              <img src="add_icon.svg" alt="Icon" /><span>Add</span>
            </button>
          )}
        </ul>
      </div>
    </div>
  );
}
