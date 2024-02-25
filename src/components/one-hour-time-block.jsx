import React from "react";

import DailyTimeBlockPeriod15 from "./daily-timeblock-period-15";

export default function OneHourTimeBlock(props) {
  let className = "daily-timeblock-period-hour " + props.backColour;

  return (
    <div class={className}>
      <DailyTimeBlockPeriod15 />
      <DailyTimeBlockPeriod15 />
      <DailyTimeBlockPeriod15 />
      <DailyTimeBlockPeriod15 />
    </div>
  );
}
