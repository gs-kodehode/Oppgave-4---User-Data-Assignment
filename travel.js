// Henter HTML-elementene
const tripForm = document.getElementById("tripForm"); // Hente skjema for å legge til nye reise!
const tripList = document.getElementById("tripList"); // Hente listen hvor reisene skal vises!

// Last inn reiser fra localStorage når siden laste på nytt !
window.onload = function () {
  loadTrips(); // Kalle funksjonen loadTrips når siden ferdig lastet!
};

// Legg til reise i localStorage når skjema blir sendt!
tripForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Hindre at skjema sender inn data og laster side på nytt!
  // Hente verdiene fra skjema input-felt!
  const destination = document.getElementById("destination").value;
  const dates = document.getElementById("dates").value;
  const activities = document.getElementById("activities").value;
  // Opprette et nytt reiseobjekt!
  const newTrip = {
    destination,
    dates,
    activities,
  };
  // Hente eksisterende reise fra localStorage, hvis det finnes noen!
  const trips = JSON.parse(localStorage.getItem("trips")) || [];
  trips.push(newTrip); // Legg til nye reise i listen
  localStorage.setItem("trips", JSON.stringify(trips)); // Lagre listen på nytt i localStorage!
  // Tømme skjema etter det blir sendt!
  tripForm.reset();
  // Oppdatere visningen av reise!
  loadTrips();
});
// Last inn reise fra localStorage og vise!
function loadTrips() {
  // Hente listen med reiser fra localStorage (eller en tom liste hvis ikke finne noen)
  const trips = JSON.parse(localStorage.getItem("trips")) || [];
  tripList.innerHTML = ""; // Tømme liste i HTML før me fylle på nytt!
  // Gå gjennom alle reisene og lager et listeelement for hver enkelt!
  trips.forEach((trip, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <p><strong>Destination:</strong> ${trip.destination}</p>
      <p><strong>Dates:</strong> ${trip.dates}</p>
      <p><strong>Activities:</strong> ${trip.activities}</p>
      <button onclick="deleteTrip(${index})">Delete</button>
    `;
    tripList.appendChild(li);
  });
}
// Slett reise fra localStorage
function deleteTrip(index) {
  // Hente liste med reiser fra localStorage!
  const trips = JSON.parse(localStorage.getItem("trips")) || [];
  trips.splice(index, 1); // Fjerne reise på den spesifik indeks!
  localStorage.setItem("trips", JSON.stringify(trips)); // Lagre den oppdaterte listen i localStorage!
  // Oppdatere visning av reise!
  loadTrips();
}
