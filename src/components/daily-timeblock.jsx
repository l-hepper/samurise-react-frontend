import React from "react";
import { useState } from "react";

import "./daily-timeblock.css";

import OneHourTimeBlock from "./one-hour-time-block";

export default function DailyTimeBlock() {
  const [newTimeBlockMode, setTimeBlockMode] = useState(false);

  const [timeBlockArray, setTimeBlockArray] = useState(populateTimeBlocks(9, 8));

  const [dayLength, setDayLength] = useState(8);


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

  // populates an array of empty timeblocks according to the size of the dayLength variable
  function populateTimeBlocks(dayStart, newDayLength) {
    let array = [];
    for (let i = 0; i < newDayLength; i++) {
      array.push({ name: "Unscheduled", startTime: Number(dayStart) + i });
    }
    return array;
  }

  return (
    <div class="daily-timeblock">
      {dayLength}
      <button onClick={handleDayLengthButtonClick}>Set Day Length</button>

      {/* <p>{startTime} - {endTime}</p> */}
      <div class="daily-timeblock-array">
        {timeBlockArray.map((timeBlock, index) => (
          <OneHourTimeBlock key={index} timeBlock={timeBlock} />
        ))}
      </div>
    </div>
  );
}
