const adpTime = document.getElementById("time");
const clockIn = document.getElementById("clock-in");
const submitBtn = document.getElementById("submit-btn");
const currentTime = document.getElementById("current-time");
const showInfoBtn = document.getElementById("info");
//setting date at top
let now = new Date();
function liveTime() {
  now = new Date();
  currentTime.innerText = now.toLocaleTimeString();
}
setInterval(liveTime, 1000);

showInfoBtn.addEventListener("click", () => {
  const infoDiv = document.getElementById("info-div");
  infoDiv.classList.toggle("hidden");
});

submitBtn.addEventListener("click", () => {
  const clockInValue = clockIn.value.trim(); // Get the clock-in time (e.g., "1:30pm")

  // Parse the time and handle AM/PM
  const timeRegex = /^(\d{1,2}):(\d{2})(am|pm)$/i; // Regex to match "hh:mmam" or "hh:mmpm"
  const match = clockInValue.match(timeRegex);

  if (!match) {
    alert(
      "Invalid time format. Please enter time in the format hh:mmam or hh:mmpm (e.g., 1:30pm)."
    );
    return;
  }

  let [_, hours, minutes, period] = match; // Extract hours, minutes, and AM/PM
  hours = Number(hours);
  minutes = Number(minutes);

  // Convert to 24-hour format
  if (period.toLowerCase() === "pm" && hours !== 12) {
    hours += 12; // Add 12 to convert PM hours to 24-hour format
  } else if (period.toLowerCase() === "am" && hours === 12) {
    hours = 0; // Convert 12 AM to 0 hours
  }

  let remainingTime = Number(40 - adpTime.value) * 60;

  // Create a Date object for the clock-in time
  const clockInDate = new Date();
  clockInDate.setHours(hours, minutes, 0, 0);

  // Add the remainingTime (in minutes) to the clock-in time
  clockInDate.setMinutes(clockInDate.getMinutes() + remainingTime);

  // Format the resulting time back to 12-hour clock format
  const resultTime = clockInDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Display or use the resultTime
  console.log(`Resulting Time: ${resultTime}`);
  const result = document.getElementById("time-out");
  result.innerText = `Clock out at: ${resultTime}`;

  result.classList.remove("hidden");
});
