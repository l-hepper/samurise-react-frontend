export async function getDayById(id) {
  const response = await fetch("http://localhost:8080/get-day/" + id);
  const responseData = await response.json();

  if (!response.ok) {
    throw Error("Fetching data failed");
  }

  return responseData;
}

export async function createNewDay() {
    
}
