const API_URL = "http://127.0.0.1:5000/events";
const form = document.querySelector("form");
const titleInput = document.getElementById("title");
const eventList = document.getElementById("event-list");

function renderEvent(event) {
  const li = document.createElement("li");
  li.textContent = event.title;
  eventList.appendChild(li);
}

function loadEvents() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((events) => {
      eventList.innerHTML = "";
      events.forEach(renderEvent);
    })
    .catch((err) => console.error("Error loading events:", err));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  if (!title) {
    alert("Title is required");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to add event");
      return res.json();
    })
    .then((newEvent) => {
      renderEvent(newEvent);
      titleInput.value = "";
    })
    .catch((err) => alert(err.message));
});

loadEvents();