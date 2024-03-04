import React, { Component } from "react";

import Navbar from "./components/navbar";
import DailyTimeBlock from "./components/daily-timeblock";
import DateSelect from "./components/date-select";
import Pomodoro from "./components/pomodoro";

function handleTimeChange() {
  alert("Time change selected");
}

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <DateSelect />
        <div class="samurise-dashboard">
          <div class="left-page">
            <DailyTimeBlock />
          </div>
          <div class="right-page">
            <div class="habit-tracker">
              <p>Habit Tracker</p>
            </div>
            <Pomodoro />
            <div class="todo">
              <p>Todo List</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
