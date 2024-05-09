let openTourId = JSON.parse(localStorage.getItem("openTourId"));
const searchTours = document.getElementById("searchTours");
const trendingTours = document.getElementById("trendingTours");
const tourInformation = document.getElementById("tourInformation");

const toursList = JSON.parse(localStorage.getItem("toursList"));

window.openTourById = (id) => {
  openTourId = [];
  openTourId.push(id);
  localStorage.setItem("openTourId", JSON.stringify(openTourId));
  window.location.href = "../html/tour.html";
};

const renderTours = () => {
  trendingTours.innerHTML = "";
  for (let i = 0; i < toursList.length; i++) {
    trendingTours.innerHTML += `
        <div class="trending-tour" onclick="openTourById('${toursList[i].id}')">
            <img src="../assets/${toursList[i].image}" alt="Not Found">
            <h5>${toursList[i].name}</h5>
            <div class="rates">
                <div class="positive-rates">
                    <i class="fa-solid fa-thumbs-up"></i>
                    <h4>${toursList[i].positiveRates}</h4>
                </div>
                <div class="negative-rates">
                    <i class="fa-solid fa-thumbs-down"></i>
                    <h4>${toursList[i].negativeRates}</h4>
                </div>
            </div>
            <div class="prices">
                <div class="old-price"><span>${toursList[i].oldPriceStr}</span></div>
                <div class="new-price"><span>${toursList[i].newPriceStr}</span></div>
            </div>
        </div>
        `;
  }
};

searchTours.addEventListener("click", () => {
  searchTour();
});

const searchTour = () => {
  const inputTours = document.getElementById("inputTours").value.toLowerCase();
  console.log("inputTours:", inputTours);
  trendingTours.innerHTML = "";
  let result = [];
  if (inputTours != "") {
    let results = toursList.filter((tour) => {
      console.log(tour.name.toLowerCase().includes(inputTours));
      if (tour.name.toLowerCase().includes(inputTours) == true) {
        result.push(tour);
      }
    });
  } else {
    renderTours();
  }
  console.log(result);
  for (let i = 0; i < result.length; i++) {
    trendingTours.innerHTML += `
        <div class="trending-tour" onclick="openTourById('${result[i].id}')">
            <img src="../assets/${result[i].image}" alt="Not Found">
            <h5>${result[i].name}</h5>
            <div class="rates">
                <div class="positive-rates">
                    <i class="fa-solid fa-thumbs-up"></i>
                    <h4>${result[i].positiveRates}</h4>
                </div>
                <div class="negative-rates">
                    <i class="fa-solid fa-thumbs-down"></i>
                    <h4>${result[i].negativeRates}</h4>
                </div>
            </div>
            <div class="prices">
                <div class="old-price"><span>${result[i].oldPriceStr}</span></div>
                <div class="new-price"><span>${result[i].newPriceStr}</span></div>
            </div>
        </div>
        `;
  }
};

renderTours();
