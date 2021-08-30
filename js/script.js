const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const deleEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

let countdownTitle = "";
let CountdownDate = "";
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split("T")[0];
deleEl.setAttribute("min", today);

//  Populate Countdown / Complete UI
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    console.log(distance);

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    console.log(days, hours, minutes, seconds);

    //  Populate Countdown
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    // Hide Input
    inputContainer.hidden = true;
    // Show Countdown
    countdownEl.hidden = false;
  }, second);
}

// Take Values from Form Input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  CountdownDate = e.srcElement[1].value;
  console.log(countdownTitle);
  console.log(CountdownDate);
  // Check for valid date
  if (CountdownDate === "") {
    alert("Please Select a date for the countdown.");
  } else {
    // Get number version of current Date , updateDOM
    countdownValue = new Date(CountdownDate).getTime();
    console.log(countdownValue);
    updateDOM();
  }
}
// Reset All Values
function reset() {
  // Hide Countdowns ,show Input
  countdownEl.hidden = true;
  inputContainer.hidden = false;

  // Stop the countdown
  clearInterval(countdownActive);
  // Rset values
  countdownTitle = "";
  CountdownDate = "";
}

// Event Listeners
countdownForm.addEventListener("submit", updateCountdown);

countdownBtn.addEventListener("click", reset);
