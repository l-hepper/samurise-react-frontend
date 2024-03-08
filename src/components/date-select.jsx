import React from "react";
import { useState } from "react";
import "./date-select.css";

export default function DateSelect() {
  const [date, setDate] = useState(new Date());

  const incrementDate = () => {
    const nextDay = new Date(date)
    nextDay.setDate(nextDay.getDate() + 1);
    setDate(nextDay);
  };

  const decrementDate = () => {
    const previousDay = new Date(date)
    previousDay.setDate(previousDay.getDate() - 1);
    setDate(previousDay);
  };

  return (
    <div class="date-select">
      <button onClick={decrementDate} class="date-select-button">&lt;</button>
      <p>{date.toLocaleDateString()}</p>
      <button onClick={incrementDate }class="date-select-button">&gt;</button>
    </div>
  );
}
