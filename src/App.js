import React, { Component } from "react";
import { useState } from "react";

import Navbar from "./components/navbar";
import DailyTimeBlock from "./components/daily-timeblock";
import DateSelect from "./components/date-select";
import Pomodoro from "./components/pomodoro";
import TaskList from "./components/tasklist";

const taskListArrayDummy = [
  {
    taskListName: "testing : 9:00 - 10:00",
    taskList: [
      { name: "Git Course - complete section 5", complete: false },
      { name: "LeetCode 5 questions", complete: false },
      { name: "Update resume with samurise", complete: false },
    ],
  },
  {
    taskListName: "whatever : 12:00 - 13:00",
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

  function switchTaskListView(timeBlockName) {
    const taskListObject = taskListArray.find(
      (item) => item.taskListName === timeBlockName
    );
    setTaskList(taskListObject);
  }

  function createNewTaskListForBlock(timeBlockName) {
    taskListArray.push({ taskListName: timeBlockName, taskListItems: []});
    switchTaskListView(timeBlockName);
  }

  return (
    <div>
      <Navbar />
      <div class="samurise-dashboard">
        <div class="left-page">
          <DailyTimeBlock
            taskListArray={taskListArray}
            switchTaskListView={switchTaskListView}
            createNewTaskListForBlock={createNewTaskListForBlock}
          />
        </div>
        <div class="right-page">
          <Pomodoro />
          <TaskList taskList={taskList} setTaskList={setTaskList} />
        </div>
      </div>
    </div>
  );
}
