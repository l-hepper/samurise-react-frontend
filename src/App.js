import React, { Component } from "react";

import Navbar from "./components/navbar";
import DailyTimeBlock from "./components/daily-timeblock";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div class="left-page">
          <div>
            <h1>placeholder</h1>
          </div>
          <DailyTimeBlock />
        </div>
      </div>
    );
  }
}

export default App;
