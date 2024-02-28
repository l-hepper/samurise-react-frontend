import React from "react";

import DailyTimeBlockPeriod15 from "./daily-timeblock-period-15";

export default function OneHourTimeBlock(props) {
  let className = "daily-timeblock-period-hour " + props.backColour;

  return (
    <div class={className}>
      <DailyTimeBlockPeriod15 timePeriod={props.timeBlock.startTime + ":00"} onClick={props.onClick}/>
      <DailyTimeBlockPeriod15 timePeriod={props.timeBlock.startTime + ":15"} onClick={props.onClick}/>
      <DailyTimeBlockPeriod15 timePeriod={props.timeBlock.startTime + ":30"} onClick={props.onClick}/>
      <DailyTimeBlockPeriod15 timePeriod={props.timeBlock.startTime + ":45"} onClick={props.onClick}/>
    </div>
  );
}
