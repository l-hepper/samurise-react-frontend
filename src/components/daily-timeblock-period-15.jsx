import React from "react";
import { useState, useRef, useEffect } from "react";

export default function DailyTimeBlockPeriod15(props) {
  let nonSelectedStyling = "daily-timeblock-period-15";
  if (props.index % 4 === 0) {
    nonSelectedStyling += " bold ";
  }

  let selectedStyling =
    nonSelectedStyling + " selected " + props.timeBlock.color;

  if (props.timeBlock.scheduled) {
    selectedStyling += " scheduled";
  }

  const [isSelected, setSelected] = useState(false);
  const [timeBlockName, setTimeBlockName] = useState(props.timeBlock.name);
  const [editNameMode, setEditNameMode] = useState(false);
  const [colorSelectMode, setColorSelectMode] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus on the input field when editNameMode becomes true
    if (editNameMode) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editNameMode]);

  function handleClick() {
    if (props.timeBlock.scheduled) {
      props.switchTaskListView(props.timeBlock.name);
      return;
    }

    if (props.newTimeBlockMode) {
      props.selectEndTime(props.timeBlock, props.index);
    } else if (!props.newTimeBlockMode) {
      props.selectStartTime(props.timeBlock, props.index, editName);
    }
  }

  function editName(event) {
    setEditNameMode(true);
    if (event.key === "Enter" || event.type === "blur") {
      const newName = event.target.value;
      if (newName === "") {
        newName = "-";
      }
      setEditNameMode(false);
      props.setTimeBlockName(newName);
      props.storeEventInEventArray(newName);
    }
  }

  const handleDeleteButtonClick = (event) => {
    event.stopPropagation(); // prevent this event from bubbling up to the container div
    setColorSelectMode(false);
    props.deleteTimeBlock(props.index);
  };

  const handleColorButtonClick = (event) => {
    event.stopPropagation();
    setColorSelectMode((previousState) => !previousState);
  };

  function handleChangeColor(color) {
    setColorSelectMode((previousState) => !previousState);
    props.handleChangeColor(color, props.index);
  }

  function testColorChange(color) {
    props.handleChangeColor(color, props.index);
  }

  const editNameInput = (
    <input
      class="edit-name-input"
      type="text"
      defaultValue=""
      onKeyDown={editName}
      onBlur={editName}
      ref={inputRef}
    />
  );

  const colorSelectRow = (
    <div class="color-select">
      <div
        class="color-select-option gray"
        onClick={() => handleChangeColor("gray")}
        onMouseOver={() => testColorChange("gray")}
      >
        <span>A</span>
      </div>
      <div
        class="color-select-option rust"
        onClick={() => handleChangeColor("rust")}
        onMouseOver={() => testColorChange("rust")}
      >
        <span>A</span>
      </div>
      <div
        class="color-select-option blue"
        onClick={() => handleChangeColor("blue")}
        onMouseOver={() => testColorChange("blue")}
      >
        <span>A</span>
      </div>
      <div
        class="color-select-option green"
        onClick={() => handleChangeColor("green")}
        onMouseOver={() => testColorChange("green")}
      >
        <span>A</span>
      </div>
      <div
        class="color-select-option goldenrod"
        onClick={() => handleChangeColor("goldenrod")}
        onMouseOver={() => testColorChange("goldenrod")}
      >
        <span>A</span>
      </div>
    </div>
  );

  return (
    <div
      onClick={handleClick}
      class={props.timeBlock.scheduled ? selectedStyling : nonSelectedStyling}
    >
      <p class="timeblock-paragraph-time">{props.timeBlock.startTime}</p>
      <div class="timeblock-information">
        <p class="timeblock-paragraph-name">
          {props.timeBlock.startOfBlock ? (
            <React.Fragment>
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
              <button
                onClick={handleColorButtonClick}
                class="timeblock-button color"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="14"
                  viewBox="0 -960 960 960"
                  width="15"
                >
                  <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z" />
                </svg>
              </button>
            </React.Fragment>
          ) : null}
          <p class="timeblock-paragraph-name">
            {colorSelectMode
              ? colorSelectRow
              : editNameMode
              ? editNameInput
              : props.timeBlock.startOfBlock
              ? props.timeBlock.name
              : null}
          </p>
        </p>
      </div>
    </div>
  );
}
