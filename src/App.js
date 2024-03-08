import React, { Component } from "react";
import { useState } from "react";

import Navbar from "./components/navbar";
import DailyTimeBlock from "./components/daily-timeblock";
import DateSelect from "./components/date-select";
import Pomodoro from "./components/pomodoro";
import TaskList from "./components/tasklist";

export default function App() {

  // this will be used between DailyTimeBlock and TaskList to render the correct TaskList for the selected timeblock
  const [selectedTimeBlock, setSelectedTimeBlock] = useState();

  return (
    <div>
      <Navbar />
      <div class="samurise-dashboard">
        <div class="left-page">
          <DailyTimeBlock />
        </div>
        <div class="right-page">
          {/* <div class="habit-tracker">
              <p>Habit Tracker</p>
            </div> */}
          <Pomodoro />
          <TaskList />
        </div>
      </div>
    </div>
  );
}
