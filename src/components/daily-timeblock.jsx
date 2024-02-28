import React from "react";
import { useState } from "react";

import "./daily-timeblock.css";

import OneHourTimeBlock from "./one-hour-time-block";

export default function DailyTimeBlock() {
  const [newTimeBlockMode, setTimeBlockMode] = useState(false);

  const [dayLength, setDayLength] = useState(8); // debugging only
  const [timeBlockArray, setTimeBlockArray] = useState(
    populateTimeBlocks(9, 8)
  );

  // populates an array of empty timeblocks according to the size of the dayLength variable
  function populateTimeBlocks(dayStart, newDayLength) {
    let array = [];
    for (let i = 0; i < newDayLength; i++) {
      array.push({ name: "Unscheduled", startTime: Number(dayStart) + i });
    }
    return array;
  }

  // updates the timeblock planner with the provided day start variable and day length variable
  function handleDayLengthButtonClick() {
    // prompt the user for desired day start time and length
    const dayStart = prompt("When do you want your day to start?");
    const newDayLength = prompt("How many hours do you want to schedule?");

    // set day length variable -- debugging?
    setDayLength(newDayLength);

    // populate the timeBlock array as required
    const newArray = populateTimeBlocks(dayStart, newDayLength);
    setTimeBlockArray(newArray);
  }

  function handleCreateNewTimeBlockClick() {
    
  }

  return (
    <div class="daily-timeblock">
      <div class="daily-timeblock-controls">
        {dayLength}
        <button onClick={handleDayLengthButtonClick}>Set Day Length</button>
        <button onClick={handleCreateNewTimeBlockClick}>Create New</button>
      </div>
      {/* <p>{startTime} - {endTime}</p> */}
      <div class="daily-timeblock-array">
        {timeBlockArray.map((timeBlock, index) => (
          <OneHourTimeBlock key={index} timeBlock={timeBlock} />
        ))}
        <div class="daily-timeblock-period-15">
          <p class="timeblock-paragraph">{timeBlockArray[timeBlockArray.length - 1].startTime + 1 + (":00")}</p>
        </div>
      </div>
    </div>
  );
}
