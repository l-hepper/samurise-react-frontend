import React, { Component } from "react";
import { useState, useEffect } from "react";
import { getDayById, getDayByDate, getToday } from "./http";

import Navbar from "./components/navbar";
import DailyTimeBlock from "./components/daily-timeblock";
import DateSelect from "./components/date-select";
import Pomodoro from "./components/pomodoro";
import TaskList from "./components/tasklist";

const taskListArrayDummy = [
  {
    taskListName: "testing : 9:00 - 10:00",
    color: "grey",
    taskList: [
      { name: "Git Course - complete section 5", complete: false },
      { name: "LeetCode 5 questions", complete: false },
      { name: "Update resume with samurise", complete: false },
    ],
  },
  {
    taskListName: "whatever : 12:00 - 13:00",
    color: "grey",
    taskList: [
      { name: "whatever 1", complete: false },
      { name: "whatever 2", complete: false },
      { name: "whatever 3", complete: false },
    ],
  },
];

let taskListArray = [];

export default function App() {
  // this will be used between DailyTimeBlock and TaskList to render the correct TaskList for the selected timeblock
  const [taskList, setTaskList] = useState();
  const [taskListColor, setTaskListColor] = useState();

  const [startNewDay, setStartNewDay] = useState(false);

  const [isFetching, setIsFetching] = useState();
  const [fetchedDay, setFetchedDay] = useState([]);
  const [error, setError] = useState();

  const [fetchedTaskListArray, setFetchedTaskListArray] = useState();

  useEffect(() => {
    async function fetchDay() {
      setIsFetching(true);

      try {
        const day = await getToday();
        setFetchedDay(day);
      } catch (error) {
        setError(error);
      }

      setIsFetching(false);
    }

    fetchDay();
  }, []);

  if (error) {
    alert(error.message);
  }

  async function incrementDay() {
    const incrementedID = fetchedDay.id + 1;
    setIsFetching(true);

    try {
      const day = await getDayById(incrementedID);
      setFetchedDay(day);
    } catch (error) {
      alert("Unable to go beyond " + fetchedDay.date);
    }

    setIsFetching(false);
  }

  async function decrementDay() {
    const decrementedID = fetchedDay.id - 1;
    setIsFetching(true);

    try {
      const day = await getDayById(decrementedID);
      setFetchedDay(day);
    } catch (error) {
      alert("Unable to go beyond " + fetchedDay.date);
    }

    setIsFetching(false);
  }

  function switchTaskListView(timeBlockName, timeBlockColor) {
    if (timeBlockName === null) {
      setTaskList(null);
      setTaskListColor("gray");
      return;
    }
    getTaskList(timeBlockName);
    setTaskListColor(timeBlockColor);
    // const taskListObject = taskListArray.find(
    //   (item) => item.taskListName === timeBlockName
    // );
    // setTaskListColor(timeBlockColor);
    // setTaskList(taskListObject);
  }

  async function getTaskList(timeBlockName) {
    const response = await fetch(
      "http://localhost:8080/get-task-list/" + timeBlockName
    );
    let responseData = await response.json();
    if (response.ok) {
      setTaskList(responseData);
    }
  }

  function createNewTaskListForBlock(timeBlockName) {
    taskListArray.push({ taskListName: timeBlockName, taskListItems: [] });
    switchTaskListView(timeBlockName);
  }

  function deleteTaskList(timeBlockName) {
    let indexToRemove = taskListArray.findIndex(
      (item) => item.taskListName === timeBlockName
    );

    // if the task list to be removed is currently shown - then remove it from screen to reflect the deletion
    if (taskList.taskListName === timeBlockName) {
      switchTaskListView(null);
    }
    taskListArray.splice(indexToRemove, 1);
  }

  return (
    <div>
      <Navbar />
      <div class="samurise-dashboard">
        <div class="left-page">
          <DailyTimeBlock
            day={fetchedDay}
            dayId={fetchedDay.id}
            incrementDay={incrementDay}
            decrementDay={decrementDay}
            taskListArray={taskListArray}
            switchTaskListView={switchTaskListView}
            createNewTaskListForBlock={createNewTaskListForBlock}
            deleteTaskList={deleteTaskList}
          />
        </div>
        <div class="right-page">
          <Pomodoro />
          <TaskList
            taskList={taskList}
            setTaskList={setTaskList}
            taskListColor={taskListColor}
          />
        </div>
      </div>
    </div>
  );
}
