import React from "react";
import { useState } from "react";

export default function DailyTimeBlockPeriod15(props) {
  let nonSelectedStyling = "daily-timeblock-period-15";
  if (props.index % 4 === 0) {
    nonSelectedStyling += " bold ";
  }
  let selectedStyling = nonSelectedStyling + " selected";

  const [isSelected, setSelected] = useState(false);

  function onClick() {

    if (isSelected) {
      setSelected(false);
    } else {
      setSelected(true);
    }

    if (props.newTimeBlockMode) {
      props.selectEndTime(props.timeBlock, props.index);
    } else if (!props.newTimeBlockMode) {
      props.selectStartTime(props.timeBlock, props.index);
    }

  }

  return (
    <div
      onClick={onClick}
      class={props.timeBlock.scheduled ? selectedStyling : nonSelectedStyling}
    >
      <p class="timeblock-paragraph-time">{props.timeBlock.startTime}</p>
      <p class="timeblock-paragraph-name">{props.timeBlock.name == null ? null : props.timeBlock.name}</p>
    </div>
  );
}
