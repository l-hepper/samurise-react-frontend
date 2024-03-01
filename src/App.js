import React, { Component } from "react";

import Navbar from "./components/navbar";
import DailyTimeBlock from "./components/daily-timeblock";
import DateSelect from "./components/date-select";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div class="left-page">
          <DateSelect />
          <DailyTimeBlock />
        </div>
      </div>
    );
  }
}

export default App;
