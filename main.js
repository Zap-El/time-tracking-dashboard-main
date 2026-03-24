document.addEventListener("DOMContentLoaded", initialize);

const periodBtns = document.querySelectorAll(".main-bottom-section button");
const cardContainer = document.querySelector(".card-container");

let currentPeriod = "daily";
let data = [];

async function initialize() {
  await getData();
  render();
}

async function getData() {
  try {
    const resp = await fetch("./data.json");
    data = await resp.json();
  } catch (error) {
    // cardContainer.innerHTML = "<p>Failed to load data</p>";
    console.error("Fehler", error);
  }
}

function getPrevious(option) {
  if (option == "daily") return "Yesterday";
  else if (option == "weekly") return "Last Week";
  else if (option == "monthly") return "Last Month";
}

function render() {
  cardContainer.innerHTML = "";
  data.forEach((item) => {
    const itemName = item.title;
    const className = item.title.toLowerCase().replace(" ", "-");
    const itemTimeframe = item.timeframes[currentPeriod];
    console.log(itemTimeframe);
    console.log(className);

    const div = document.createElement("div");
    div.classList.add(className);
    div.classList.add("card");

    let stringToInject = `

    <div class="exercise-container">
          <div class="exercise-top-section">
            <img src="images/icon-${className}.svg" alt="${itemName}" />
          </div>
          <div class="exercise-bottom-section">
            <div class="activity">
              <h4>${itemName}</h4>
              <img src="images/icon-ellipsis.svg" alt="Menu Points" />
            </div>

            <div class="times">
              <p class="activity-hours">${itemTimeframe.current}hrs</p>
              <p class="activity-hours-date">${getPrevious(currentPeriod)} - ${itemTimeframe.previous}hrs</p>
            </div>
          </div>
        </div>
`;
    div.innerHTML = stringToInject;
    cardContainer.appendChild(div);
  });
}
function removeActiveClass() {
  periodBtns.forEach((item) => item.classList.remove("active"));
}

periodBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentPeriod = btn.dataset.period;
    removeActiveClass();
    btn.classList.add("active");
    render();
  });
});
