import React from "react";
import { useState } from "react";

export default function DailyTimeBlockPeriod15(props) {
  let nonSelectedStyling = "daily-timeblock-period-15";
  if (props.index % 4 === 0) {
    nonSelectedStyling += " bold ";
  }
  let selectedStyling = nonSelectedStyling + " selected";

  const [isSelected, setSelected] = useState(false);
  const [editNameMode, setEditNameMode] = useState(false);

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

  function handleDoubleClick() {
    if (
      !props.timeBlock.name ||
      props.timeBlock.name === "Select end time..."
    ) {
      return;
    }
    alert("double click");
  }

  const handleDeleteButtonClick = (event) => {
    event.stopPropagation(); // prevent this event from bubbling up to the container div
    props.deleteTimeBlock(props.index);
  };

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      class={props.timeBlock.scheduled ? selectedStyling : nonSelectedStyling}
    >
      <p class="timeblock-paragraph-time">{props.timeBlock.startTime}</p>
      <div class="timeblock-information">
        <p class="timeblock-paragraph-name">
          {props.timeBlock.name === null ? null : (
            <button
              onClick={handleDeleteButtonClick}
              class="timeblock-button delete"
            >

              {/* Trash icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                viewBox="0 -960 960 960"
                width="15"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>


            </button>
          )}
          <p class="timeblock-paragraph-name">
            {props.timeBlock.name === null ? null : props.timeBlock.name}
          </p>
        </p>
      </div>
    </div>
  );
}
