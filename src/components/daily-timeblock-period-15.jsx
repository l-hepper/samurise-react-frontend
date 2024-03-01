import React from "react";
import { useState } from "react";

export default function DailyTimeBlockPeriod15(props) {
  let nonSelectedStyling = "daily-timeblock-period-15";
  if (props.index % 4 === 0) {
    nonSelectedStyling += " bold ";
  }
  let selectedStyling = nonSelectedStyling + " selected";

  const [isSelected, setSelected] = useState(false);

  function handleClick() {
    if (props.timeBlock.scheduled) {
      return;
    }

    if (props.newTimeBlockMode) {
      props.selectEndTime(props.timeBlock, props.index);
    } else if (!props.newTimeBlockMode) {
      props.selectStartTime(props.timeBlock, props.index);
    }
  }

  const handleDeleteButtonClick = (event) => {
    event.stopPropagation(); // prevent this event from bubbling up to the container div
    props.deleteTimeBlock(props.index)
  }

  return (
    <div
      onClick={handleClick}
      class={props.timeBlock.scheduled ? selectedStyling : nonSelectedStyling}
    >
      <p class="timeblock-paragraph-time">{props.timeBlock.startTime}</p>
      <div class="timeblock-information">
        <p class="timeblock-paragraph-name">
          {props.timeBlock.name === null || props.timeBlock.name === "Select end time..." ? null : <button class="timeblock-button edit">E</button>}
          {props.timeBlock.name === null || props.timeBlock.name === "Select end time..." ? null : <button onClick={handleDeleteButtonClick} class="timeblock-button delete">D</button>}
          <p class="timeblock-paragraph-name">{props.timeBlock.name === null ? null : props.timeBlock.name}</p>
        </p>
      </div>
    </div>
  );
}
