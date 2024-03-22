export async function getDayById(id) {
  const response = await fetch("http://localhost:8080/get-day/" + id);
  const responseData = await response.json();

  if (!response.ok) {
    throw Error("Fetching data failed");
  }

  return responseData;
}

export async function getToday() {
  const response = await fetch("http://localhost:8080/get-today/1");
  const responseData = await response.json();

  if (!response.ok) {
    throw Error("Fetching data failed");
  }

  return responseData;
}

export async function getTaskListArray() {
  const response = await fetch("http://localhost:8080/get-task-list-array/1");
  const responseData = await response.json();

  if (!response.ok) {
    throw Error("Fetching data failed");
  }

  return responseData;
}

export async function getDayByDate(date) {
  const response = await fetch("http://localhost:8080/get-day-by-date/" + date);
  const responseData = await response.json();

  if (!response.ok) {
    throw Error("Fetching data failed");
  }

  return responseData;
}

export async function createNewDay() {}

export async function postTimeBlock(timeBlockEventInformation) {
  const response = await fetch("http://localhost:8080/create-timeblock-event", {
    method: "POST",
    body: JSON.stringify({ ...timeBlockEventInformation }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const responseData = await response.json();

  if (!responseData.ok) {
    throw Error("Creating time block event failed.");
  }
}

export async function postTaskItem(task) {
  const response = await fetch("http://localhost:8080/create-task-item", {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    }
  });

  const responseData = response.json();
}
