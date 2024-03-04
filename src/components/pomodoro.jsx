import React from "react";
import { useState, useEffect } from "react";
import "./pomodoro.css";

export default function Pomodoro() {
  const [timeSelected, setTimeSelected] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState();
  const [minutesLeft, setMinutesLeft] = useState();
  const [countingDown, setCountingDown] = useState(false);

  function handleTimeChange(event) {
    setTimeSelected(parseInt(event.target.value));
  }

  function beginCountDown() {
    const totalSeconds = timeSelected * 60;
    setSecondsLeft(0);
    setMinutesLeft(timeSelected);
    setCountingDown(true);
  }

  function pomodoroComplete() {
    alert("Complete");
  }

  // countdown effect
  useEffect(() => {
    let intervalId;

    if (countingDown) {
      intervalId = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [countingDown]);

  useEffect(() => {
    if (secondsLeft === 0 && minutesLeft === 0) {
      setCountingDown(false);
      pomodoroComplete();
    } else if (secondsLeft === -1) {
        setSecondsLeft(previousSeconds => previousSeconds = 59);
        setMinutesLeft(previousMinutes => previousMinutes - 1);
    }
  }, [secondsLeft]);

  const timerSelect = (
    <select
      class="timer-select"
      onChange={handleTimeChange}
      value={countingDown ? secondsLeft : timeSelected}
    >
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="25">25</option>
      <option value="30">30</option>
      <option value="45">45</option>
    </select>
  );

  return (
    <div class="pomodoro-timer">
      <div>
        <p class="pomodoro-section-label">Timer</p>
        <p class="total-time-tracker">Total time today: </p>
      </div>
      <div class="timer">
        <div class="countdown">{countingDown ? minutesLeft + ":" + secondsLeft : timerSelect}</div>
        <button class="begin-button" onClick={beginCountDown}>
          Begin
        </button>
      </div>
    </div>
  );
}
