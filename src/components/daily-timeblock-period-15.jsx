import React from "react";
import {useState} from "react";

export default function DailyTimeBlockPeriod15() {
    let nonSelectedStyling = "daily-timeblock-period-15";
    let selectedStyling = "daily-timeblock-period-15 selected";

    const [isSelected, setSelected] = useState(false);

    function onClick() {
        if (isSelected) {
            setSelected(false);
        } else {
            setSelected(true);
        }
    }
  return (
    <div onClick={onClick} class={isSelected ? selectedStyling : nonSelectedStyling}>
      <p>Test</p>
    </div>
  );
}