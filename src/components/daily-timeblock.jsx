import React from "react";
import { useState } from "react";

import "./daily-timeblock.css";

import OneHourTimeBlock from "./one-hour-time-block";

export default function DailyTimeBlock() {
  let timeBlockRange = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

  const [startTime, updateStartTime] = useState();
  const [endTime, updateEndTime] = useState();
  const [newTimeBlockMode, setTimeBlockMode] = useState(false);

  // example timeblock object for debugging and testing
  const timeBlockExample = {
    startTime: startTime,
    endTime: endTime,
  };

  const handleTimeBlockClick = (timeSelected) => {
    if (!newTimeBlockMode) {
      timeBlockExample.startTime = updateStartTime(timeSelected);
      setTimeBlockMode(true);
    }

    if (newTimeBlockMode) {
      timeBlockExample.endTime = updateEndTime(timeSelected);
      setTimeBlockMode(false);
    }
  };

  return (
    <div class="daily-timeblock">
      <h6>
        {timeBlockExample.startTime} - {timeBlockExample.endTime}
      </h6>
      {timeBlockRange.map((item) => (
        <OneHourTimeBlock
          backColour="white"
          startHour={item}
          onClick={handleTimeBlockClick}
        />
      ))}
    </div>
  );
}
