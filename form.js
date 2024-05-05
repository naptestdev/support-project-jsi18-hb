document.addEventListener("DOMContentLoaded", function() {
  const searchBtn = document.getElementById("searchBtn");
  searchBtn.addEventListener("click", searchFlights);
});

function searchFlights() {
  const origin = document.getElementById("origin").value.trim();
  const destination = document.getElementById("destination").value.trim();
  const departureDate = document.getElementById("departureDate").value;
  const returnDate = document.getElementById("returnDate").value;
  const passengerCount = parseInt(document.getElementById("passengerCount").value);
  const flightClass = document.getElementById("class").value;

  // Validate user input
  if (origin === "" || destination === "" || departureDate === "" || passengerCount < 1) {
    alert("Please fill in all required fields.");
    return;
  }

  // Simulate fetching flight data (replace with actual API call)
  setTimeout(() => {
    const flightData = [
      { 
        origin: "New York", 
        destination: "Los Angeles", 
        departureDate: "2024-05-01",
        returnDate: "2024-05-10",
        passengerCount: 2,
        class: "economy",
        price: 500
      },
      { 
        origin: "New York", 
        destination: "San Francisco", 
        departureDate: "2024-05-01",
        returnDate: "2024-05-10",
        passengerCount: 1,
        class: "business",
        price: 800
      },
      // Add more flight data objects here
    ];

    const filteredFlights = flightData.filter(flight => 
      flight.origin.toLowerCase() === origin.toLowerCase() &&
      flight.destination.toLowerCase() === destination.toLowerCase() &&
      flight.departureDate === departureDate &&
      flight.returnDate === returnDate &&
      flight.passengerCount >= passengerCount &&
      flight.class === flightClass
    );

    if (filteredFlights.length > 0) {
      displayFlightResults(filteredFlights);
    } else {
      displayNoFlightsAvailable();
    }
  }, 1000); // Simulate loading delay
}

function displayFlightResults(flights) {
  const flightResultsContainer = document.getElementById("flightResults");
  flightResultsContainer.innerHTML = ""; // Clear previous results

  flights.forEach(flight => {
    const flightElement = document.createElement("div");
    flightElement.classList.add("flight");
    flightElement.innerHTML = `
      <h3>${flight.origin} to ${flight.destination}</h3>
      <p>Departure Date: ${flight.departureDate}</p>
      <p>Return Date: ${flight.returnDate}</p>
      <p>Passenger Count: ${flight.passengerCount}</p>
      <p>Class: ${flight.class}</p>
      <p>Price: $${flight.price}</p>
    `;
    flightResultsContainer.appendChild(flightElement);
  });
}

function displayNoFlightsAvailable() {
  const flightResultsContainer = document.getElementById("flightResults");
  flightResultsContainer.innerHTML = "<p>No flights available for the selected criteria.</p>";
}
