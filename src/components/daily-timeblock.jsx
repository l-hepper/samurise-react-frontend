import React from "react";

import "./daily-timeblock.css";

import OneHourTimeBlock from "./one-hour-time-block";

export default function DailyTimeBlock() {
  return (
    <div class="daily-timeblock">
      <h6>8am - 8pm</h6>
      <OneHourTimeBlock backColour="white"/>
      <OneHourTimeBlock backColour="gray"/>
      <OneHourTimeBlock backColour="white"/>
      <OneHourTimeBlock backColour="gray"/>
      <OneHourTimeBlock backColour="white"/>
      <OneHourTimeBlock backColour="gray"/>
      <OneHourTimeBlock backColour="white"/>
      <OneHourTimeBlock backColour="gray"/>
      <OneHourTimeBlock backColour="white"/>
      <OneHourTimeBlock backColour="gray"/>
      <OneHourTimeBlock backColour="white"/>
      <OneHourTimeBlock backColour="gray"/>
    </div>
  );
}
