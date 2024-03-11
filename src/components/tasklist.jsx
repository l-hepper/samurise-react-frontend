import React from "react";
import { useState, useRef, useEffect } from "react";

import "./tasklist.css";



export default function TaskList({taskList, setTaskList}) {
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

      const modifiedTaskList = {...taskList};
      modifiedTaskList.taskListItems.push(newTask);

      setTaskList(modifiedTaskList);
      setAddNewTaskMode((previousState) => (previousState = false));
    }
  }

  // uses the index of a task item to get from task array and flip its complete flag
  function markTaskItemAsCompleteOrNotComplete(index) {
    const modifiedTaskList = {...taskList};
    let modifiedTaskItem = modifiedTaskList.taskListItems[index];
    modifiedTaskItem = {
      ...modifiedTaskItem,
      complete: !modifiedTaskItem.complete,
    };
    modifiedTaskList.taskListItems[index] = modifiedTaskItem;
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
      <p class="tasklist-section-label">Tasks</p>
      <div class="task-content">
        <p class="timeblock-name">{taskList ? taskList.taskListName : null}</p>
        <ul>
          {taskList ? (taskList.taskListItems.map((item, index) => (
            <li
              key={item.name}
              onClick={() => markTaskItemAsCompleteOrNotComplete(index)}
              onDoubleClick={() => removeTaskItem(index)}
              className={"tasklist-item" + (item.complete ? " complete" : "")}
            >
              <span>{item.name}</span>
            </li>
          ))) : null}
          {taskList ? addNewTaskMode ? (
            <li>{input}</li>
          ) : (
            <button className="add-taskitem-button"
              onClick={() =>
                setAddNewTaskMode((previousState) => (previousState = true))
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg><span> Add</span>
            </button>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
