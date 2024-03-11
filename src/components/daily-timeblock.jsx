import React from "react";
import { useState } from "react";

import "./daily-timeblock.css";

import DailyTimeBlockPeriod15 from "./daily-timeblock-period-15";
import DateSelect from "./date-select";

// global values set outside of function to ensure they persist beyond state update
let startTimeBlock = null;
let startTimeBlockIndex = null;
let endTimeBlock = null;
let endTimeBlockIndex = null;
let eventLength = null;
let storedNameFunction = null;

export default function DailyTimeBlock(props) {
  const [newTimeBlockMode, setNewTimeBlockMode] = useState(false);
  const [userInformation, setUserInformation] = useState();
  const [dayLength, setDayLength] = useState(8); // debugging only
  const [timeBlockArray, setTimeBlockArray] = useState(
    populateTimeBlocks(9, 8)
  );
  const [eventArray, setEventArray] = useState([]);

  // populates an array of empty timeblocks according to the size of the dayLength variable
  function populateTimeBlocks(dayStart, newDayLength) {
    let array = [];
    let timeBlockEndings = [":00", ":15", ":30", ":45"];
    for (let i = 0; i < newDayLength; i++) {
      for (let j = 0; j < 4; j++) {
        // each hour is composed of four 15 minute blocks
        array.push({
          name: null,
          startTime: Number(dayStart) + i + timeBlockEndings[j],
          endTime: incrementTimeValueBy15(
            Number(dayStart) + i + timeBlockEndings[j]
          ),
          scheduled: false,
          startOfBlock: false,
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
    for (
      let i = startTimeBlockIndex;
      i <=
      (endTimeBlockIndex === null ? startTimeBlockIndex : endTimeBlockIndex);
      i++
    ) {
      timeBlockArray[i].scheduled = false;
      timeBlockArray[i].startOfBlock = null;
      timeBlockArray[i].name = null;
    }
    clearBlockSelections();
    setNewTimeBlockMode((state) => (state = false));
  }

  function clearBlockSelections() {
    startTimeBlock = null;
    startTimeBlockIndex = null;
    endTimeBlock = null;
    endTimeBlockIndex = null;
    eventLength = null;
    storedNameFunction = null;
  }

  function selectStartTime(timeBlock, index, nameFunction) {
    timeBlockArray[index].name = "Select end time...";
    timeBlockArray[index].scheduled = true;
    timeBlockArray[index].startOfBlock = true;
    setNewTimeBlockMode((state) => (state = true));
    startTimeBlock = timeBlock;
    startTimeBlockIndex = index;
    storedNameFunction = nameFunction;
  }

  function selectEndTime(timeBlock, index) {
    endTimeBlock = timeBlock;
    endTimeBlockIndex = index;
    setNewTimeBlockMode((state) => (state = false));

    for (let i = startTimeBlockIndex; i <= endTimeBlockIndex; i++) {
      timeBlockArray[i].scheduled = true;
    }

    storedNameFunction(); // calls editName in daily-timeblock-period-15 which then calls the two functions below
  }

  function setTimeBlockName(name) {
    let modifiedArray = [...timeBlockArray];
    let formattedName = name + " : " + startTimeBlock.startTime + " - " + endTimeBlock.endTime;
    for (let i = startTimeBlockIndex; i <= endTimeBlockIndex; i++) {
      modifiedArray[i].name = formattedName;
    }
    setTimeBlockArray(modifiedArray);

    // create a new empty task list for this block
    props.createNewTaskListForBlock(formattedName);
  }

  function storeEventInEventArray(eventName) {
    eventArray.push({
      name: eventName,
      startTime: startTimeBlock.startTime,
      endTime: endTimeBlock.endTime,
      startIndex: startTimeBlockIndex,
      endIndex: endTimeBlockIndex,
    });
    clearBlockSelections();
  }

  function deleteTimeBlock(index) {
    // get the targeted event
    let targetedEvent = eventArray.find((item) => item.startIndex === index);

    // if no event is found then it means the user has not created a complete timeblock and the initial selection only need to be cancelled
    if (!targetedEvent) {
      alert("No event found");
      cancelSelection();
    }

    let modifiedArray = [...timeBlockArray];
    for (let i = targetedEvent.startIndex; i <= targetedEvent.endIndex; i++) {
      modifiedArray[i].name = null;
      modifiedArray[i].scheduled = false;
      modifiedArray[i].startOfBlock = false;
    }

    eventArray.splice(index, 1);
    setTimeBlockArray(modifiedArray);
    clearBlockSelections();
  }

  // will transform a time value by adding 15 minutes to it - required for calculating an accurate 'endtime' to timeblocks
  function incrementTimeValueBy15(time) {
    if (time.length == 4) {
      if (time.substring(2) == "45") {
        time = Number(time[0]) + 1 + ":00";
      } else {
        time = time[0] + ":" + (Number(time.substring(2)) + 15);
      }
    } else {
      if (time.substring(3) == "45") {
        time = Number(time.substring(0, 2)) + 1 + ":00";
      } else {
        time =
          Number(time.substring(0, 2)) + ":" + (Number(time.substring(3)) + 15);
      }
    }
    return time;
  }

  return (
    <div class="daily-timeblock">
      <div class="daily-timeblock-controls">
        <p class="daily-timeblock-section-label">Planner</p>
        <DateSelect />
        <button
          class="daily-timeblock-settings-button"
          onClick={handleDayLengthButtonClick}
        >
          <div class="settings-svg-div">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="22"
              viewBox="0 -960 960 960"
              width="22"
            >
              <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" />
            </svg>
          </div>
        </button>
      </div>

      <div class="daily-timeblock-array">
        <div class="daily-timeblock-period-hour">
          {timeBlockArray.map((timeBlock, index) => (
            <DailyTimeBlockPeriod15
              timeBlock={timeBlock}
              index={index}
              newTimeBlockMode={newTimeBlockMode}
              selectStartTime={selectStartTime}
              selectEndTime={selectEndTime}
              deleteTimeBlock={deleteTimeBlock}
              setTimeBlockName={setTimeBlockName}
              storeEventInEventArray={storeEventInEventArray}
              switchTaskListView={props.switchTaskListView}
            />
          ))}
        </div>
        {/* slightly hacky work around to achieve a pleasing ending time to the timeblock  */}
        <div class="daily-timeblock-period-15 bold">
          <p class="timeblock-paragraph-time">
            {timeBlockArray[timeBlockArray.length - 1].endTime}
          </p>
        </div>
      </div>
    </div>
  );
}
