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
    setSecondsLeft(59);
    setMinutesLeft(timeSelected - 1);
    setCountingDown(true);
  }

  function pomodoroComplete() {
    let audio = new Audio(
      "/short-success-sound-glockenspiel-treasure-video-game-6346.mp3"
    );
    audio.play();
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
    } else if (secondsLeft === 0) {
      setSecondsLeft((previousSeconds) => (previousSeconds = 59));
      setMinutesLeft((previousMinutes) => previousMinutes - 1);
    }
  }, [secondsLeft]);

  const timerSelect = (
    <select
      class="timer-select"
      onChange={handleTimeChange}
      value={timeSelected}
    >
      <option value="10">10:00</option>
      <option value="15">15:00</option>
      <option value="25">25:00</option>
      <option value="30">30:00</option>
      <option value="45">45:00</option>
    </select>
  );

  const timerCountDown = (
    <option class="timer-select counting">
      {(minutesLeft > 9 ? minutesLeft : "0" + minutesLeft) +
        ":" +
        (secondsLeft > 9 ? secondsLeft : "0" + secondsLeft)}
    </option>

  );
  return (
    <div class="pomodoro-timer">
      <div>
        <p class="pomodoro-section-label">Timer</p>
      </div>
      <div class="timer">
        <div class="countdown">
          {countingDown
            ? timerCountDown
            : timerSelect}
        </div>
        <button class="begin-button" onClick={beginCountDown}>
          Begin
        </button>
      </div>
    </div>
  );
}
