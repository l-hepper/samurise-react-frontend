import React from "react";
import { useState } from "react";

import "./daily-timeblock.css";

import OneHourTimeBlock from "./one-hour-time-block";
import DailyTimeBlockPeriod15 from "./daily-timeblock-period-15";

export default function DailyTimeBlock() {
  const [newTimeBlockMode, setTimeBlockMode] = useState(false);

  const [dayLength, setDayLength] = useState(8); // debugging only
  const [timeBlockArray, setTimeBlockArray] = useState(
    populateTimeBlocks(9, 8)
  );

  // populates an array of empty timeblocks according to the size of the dayLength variable
  function populateTimeBlocks(dayStart, newDayLength) {
    let array = [];
    let timeBlockEndings = [":00", ":15", ":30", ":45"];
    for (let i = 0; i < newDayLength; i++) {
      for (let j = 0; j < 4; j++) {
        array.push({
          name: "Unscheduled",
          startTime: Number(dayStart) + i + timeBlockEndings[j],
        });
      }
    }
    return array;
  }

  // updates the timeblock planner with the provided day start variable and day length variable
  function handleDayLengthButtonClick() {
    // prompt the user for desired day start time and length - TODO place these options within a separate pop-up menu for timeblock planner settings
    const dayStart = prompt("When do you want your day to start?");
    const newDayLength = prompt("How many hours do you want to schedule?");

    // set day length variable -- debugging?
    setDayLength(newDayLength);

    // populate the timeBlock array as required
    const newArray = populateTimeBlocks(dayStart, newDayLength);
    setTimeBlockArray(newArray);
  }

  function handleCreateNewTimeBlockClick(startTime, index) {

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
        {/* {timeBlockArray.map((timeBlock, index) => (
          <OneHourTimeBlock key={index} timeBlock={timeBlock} />
        ))} */}
        <div class="daily-timeblock-period-hour">
          {timeBlockArray.map((timeBlock, index) => (
            <DailyTimeBlockPeriod15
              timePeriod={timeBlock.startTime}
              index={index}
            />
          ))}
        </div>
        {/* slightly hacky work around to achieve a pleasing ending time to the timeblock  */}
        <div class="daily-timeblock-period-15 bold">
          <p class="timeblock-paragraph">
            {/* TODO - encapsulate within function - */}
            {Number(
              timeBlockArray[timeBlockArray.length - 1].startTime.substring(
                0,
                timeBlockArray[timeBlockArray.length - 1].startTime.length == 5 ? 2 : 1
              )
            ) +
              1 +
              ":00"}
          </p>
        </div>
      </div>
    </div>
  );
}
