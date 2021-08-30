const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const deleEl = document.getElementById("date-picker");

let countdownTitle = "";
let CountdownDate = "";
let countdownValue = Date;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split("T")[0];
deleEl.setAttribute("min", today);

// Take Values from Form Input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  CountdownDate = e.srcElement[1].value;
  console.log(countdownTitle);
  console.log(CountdownDate);
  // Get number version of current Date , updateDOM
  countdownValue = new Date(CountdownDate).getTime();
  console.log(countdownValue);
}

// Event Listeners
countdownForm.addEventListener("submit", updateCountdown);
