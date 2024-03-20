import React from "react";
import { useState, useEffect } from "react";
import "./date-select.css";

import { getDayById } from "../http";

export default function DateSelect(props) {
  const [date, setDate] = useState(new Date());

  // const [fetchedData, setFetchedData] = useState([]);
  // const [error, setError] = useState();
  // const [isFetching, setIsFetching] = useState();

  // useEffect(() => {
  //   async function getDay() {
  //     setIsFetching(true);
  //     try {
  //       const responseData = await getDayById(1);
  //       setFetchedData(responseData);
  //     } catch (error) {
  //       setError(error.message || "Error...");
  //     }
  //     setIsFetching(false);
  //   }

  //   getDay();
  // }, []);

  const incrementDate = () => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    setDate(nextDay);
  };

  const decrementDate = () => {
    const previousDay = new Date(date);
    previousDay.setDate(previousDay.getDate() - 1);
    setDate(previousDay);
  };

  return (
    <div class="date-select">
      <button onClick={props.decrementDay} class="date-select-button">
        &lt;
      </button>
      <p>{props.day.date}</p>
      <button onClick={props.incrementDay} class="date-select-button">
        &gt;
      </button>
    </div>
  );
}
