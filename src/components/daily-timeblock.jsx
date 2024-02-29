import React from "react";
import { useState } from "react";

import "./daily-timeblock.css";

import OneHourTimeBlock from "./one-hour-time-block";
import DailyTimeBlockPeriod15 from "./daily-timeblock-period-15";

let startTimeBlock = null;
let startTimeBlockIndex = null;
let endTimeBlock = null;
let endTimeBlockIndex = null;

export default function DailyTimeBlock() {
  const [newTimeBlockMode, setNewTimeBlockMode] = useState(false);
  const [userInformation, setUserInformation] = useState();
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
          name: null,
          startTime: Number(dayStart) + i + timeBlockEndings[j],
          scheduled: false,
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

  function cancelSelection() {
    timeBlockArray[startTimeBlockIndex].scheduled = false;
    setNewTimeBlockMode((state) => (state = false));
  }

  function selectStartTime(timeBlock, index) {
    timeBlockArray[index].scheduled = true;
    setNewTimeBlockMode((state) => (state = true));
    startTimeBlock = timeBlock;
    startTimeBlockIndex = index;
    setUserInformation("starttime function triggered" + index);
  }

  function selectEndTime(timeBlock, index) {
    endTimeBlock = timeBlock;
    endTimeBlockIndex = index;
    setUserInformation("end function triggered" + index);
    setNewTimeBlockMode((state) => (state = false));

    for (let i = startTimeBlockIndex; i <= endTimeBlockIndex; i++) {
      timeBlockArray[i].scheduled = true;
    }

    let timeBlockName = prompt("Select a name for the new block: ");
    timeBlockArray[startTimeBlockIndex].name = timeBlockName;
  }

  return (
    <div class="daily-timeblock">
      <div class="daily-timeblock-controls">
        <p>{newTimeBlockMode + ""}</p>
        {dayLength}
        <button onClick={handleDayLengthButtonClick}>Set Day Length</button>
        <button onClick={cancelSelection}>Cancel Selection</button>
      </div>
      {userInformation}
      {/* <p>{startTime} - {endTime}</p> */}
      <div class="daily-timeblock-array">
        {/* {timeBlockArray.map((timeBlock, index) => (
          <OneHourTimeBlock key={index} timeBlock={timeBlock} />
        ))} */}
        <div class="daily-timeblock-period-hour">
          {timeBlockArray.map((timeBlock, index) => (
            <DailyTimeBlockPeriod15
              timeBlock={timeBlock}
              index={index}
              newTimeBlockMode={newTimeBlockMode}
              selectStartTime={selectStartTime}
              selectEndTime={selectEndTime}
            />
          ))}
        </div>
        {/* slightly hacky work around to achieve a pleasing ending time to the timeblock  */}
        <div class="daily-timeblock-period-15 bold">
          <p class="timeblock-paragraph-time">
            {/* TODO - encapsulate within function - */}
            {Number(
              timeBlockArray[timeBlockArray.length - 1].startTime.substring(
                0,
                timeBlockArray[timeBlockArray.length - 1].startTime.length == 5
                  ? 2
                  : 1
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
