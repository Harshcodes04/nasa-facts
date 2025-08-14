const api_key = "l0QnketoMpKGrIoEEIhFCuZ6hDgE5dZfDl2VH1P6";

function fetchAPOD(date) {
  return fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}`
  )
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error fetching APOD:", error);
      return null;
    });
}

function fetchSpaceFact() {
  return fetch("http://numbersapi.com/random/year")
    .then((response) => response.text())
    .catch((error) => {
      console.log("Error fetching space facts:", error);
      const fallbackFacts = [
        "A day on Venus is longer than its year!",
        "Jupiter has 95 known moons!",
        "The Sun accounts for 99.86% of all mass in our solar system!",
        "Light from the Sun takes 8 minutes to reach Earth!",
      ];
      return fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
    });
}

function displayAPOD(data) {
  if (!data) {
    document.getElementById("picture_name").innerHTML = "Error loading data";
    return;
  }
  document.getElementById("picture_name").innerHTML = data.title;
  const picturediv = document.getElementById("picture");
  if (data.media_type === "image") {
    picturediv.innerHTML = `<img src="${data.url}" alt="${data.title}">`;
  } else if (data.media_type === "video") {
    picturediv.innerHTML = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
  }
  document.getElementById("description").innerHTML = data.explanation;
}

function displayRandomSpaceFact() {
  fetchSpaceFact().then((fact) => {
    document.getElementById("fetched_facts").innerHTML = fact;
  });
}

function handleDateChange() {
  const selectedDate = document.getElementById("date_input").value;

  fetchAPOD(selectedDate).then((data) => {
    displayAPOD(data);
    displayRandomSpaceFact();
  });
}

function init() {
  handleDateChange();

  document
    .getElementById("date_input")
    .addEventListener("change", handleDateChange);
}

document.addEventListener("DOMContentLoaded", init);
