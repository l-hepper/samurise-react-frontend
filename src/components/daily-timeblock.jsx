import React from "react";
import { useState } from "react";

import "./daily-timeblock.css";

import OneHourTimeBlock from "./one-hour-time-block";

export default function DailyTimeBlock() {
  let timeBlockRange = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

  const [startTime, updateStartTime] = useState();
  const [endTime, updateEndTime] = useState();
  const [newTimeBlockMode, setTimeBlockMode] = useState(false);

  const [timeBlocksArray, setTimeBlocksArray] = useState([]);

  const handleTimeBlockClick = (timeSelected) => {
    if (!newTimeBlockMode) {
      // clear the current block time selection
      updateStartTime(null);
      updateEndTime(null);

      updateStartTime(timeSelected);
      setTimeBlockMode(true);
    }

    if (newTimeBlockMode) {
      // calculates the end time of the block based on the final selected end block
      let correctedEndTime = Number(timeSelected.slice(-2)) + 15;
      if (correctedEndTime == 60) {
        correctedEndTime = ":00";
        if (Number(timeSelected.slice(0, 2) > 9)) {
          timeSelected = Number(timeSelected.slice(0, 2)) + 1;
        } else {
          timeSelected = Number(timeSelected.slice(0, 1)) + 1;
        }
        timeSelected += ":00";
      } else {
        timeSelected = timeSelected.slice(0, 2) + "" + correctedEndTime;
      }

      updateEndTime(timeSelected);

      setTimeBlocksArray((timeBlocksArray) => [
        ...timeBlocksArray,
        { startTime, endTime: timeSelected },
      ]);

      setTimeBlockMode(false);
    }
  };

  return (
    <div class="daily-timeblock">
      {timeBlocksArray.map((item) => (
        <p key={timeBlocksArray.indexOf(item)}>
          {item.startTime} - {item.endTime}
        </p>
      ))}

      {/* <p>{startTime} - {endTime}</p> */}
      {timeBlockRange.map((item) => (
        <OneHourTimeBlock
          key={item}
          backColour="white"
          startHour={item}
          onClick={handleTimeBlockClick}
        />
      ))}
    </div>
  );
}
