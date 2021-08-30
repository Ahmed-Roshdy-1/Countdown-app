const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const deleEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const CompleteEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownTitle = "";
let CountdownDate = "";
let countdownValue = Date;
let countdownActive;
let savaCountdown; // to store it Local Storage

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
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Hide Input
    inputContainer.hidden = true;
    // add the complete state
    if (distance < 0) {
      countdownEl.hidden = true;
      completeElInfo.textContent = `${countdownTitle} finished on ${CountdownDate}`;
      CompleteEl.hidden = false;
    } else {
      //  Populate Countdown
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      //  hide complete div
      CompleteEl.hidden = true;
      // Show Countdown
      countdownEl.hidden = false;
    }
  }, second);
}

// Take Values from Form Input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  CountdownDate = e.srcElement[1].value;
  savaCountdown = {
    title: countdownTitle,
    date: CountdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(savaCountdown));
  // Check for valid date
  if (CountdownDate === "") {
    alert("Please Select a date for the countdown.");
  } else {
    // Get number version of current Date , updateDOM
    countdownValue = new Date(CountdownDate).getTime();
    updateDOM();
  }
}

// Reset All Values
function reset() {
  // Hide Countdowns ,show Input
  countdownEl.hidden = true;
  CompleteEl.hidden = true;
  inputContainer.hidden = false;

  // Stop the countdown
  clearInterval(countdownActive);
  // Reset values
  countdownTitle = "";
  CountdownDate = "";
  localStorage.removeItem("countdown");
}

function restorePreviousCountdown() {
  // Get countdown from localStorage if available
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savaCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savaCountdown.title;
    CountdownDate = savaCountdown.date;
    countdownValue = new Date(CountdownDate).getTime();
    updateDOM();
  }
}

// Event Listeners
countdownForm.addEventListener("submit", updateCountdown);

countdownBtn.addEventListener("click", reset);

completeBtn.addEventListener("click", reset);

// On Load, Check local Storage
restorePreviousCountdown();
