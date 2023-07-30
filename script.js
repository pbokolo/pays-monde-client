"use strict";
const API = "https://restcountries.com/v3.1/name";
const section = document.getElementById("section");
const formSearch = document.getElementById("form-search");
const queryTxt = document.getElementById("query-txt");

const getData = async (country) => {
  try {
    renderSpinner();
    const response = await fetch(`${API}/${country}`);
    const data = await response.json();
    renderCountry(data);
  } catch (error) {
    clearSection();
    alert(`Non trouvé: ${country}`);
  }
};

const renderCountry = (data) => {
  const [country] = data;
  const [cur] = country.currencies
    ? Object.keys(country.currencies)
    : ["No official"];
  const { name, symbol } =
    cur !== "No official"
      ? country.currencies[`${cur}`]
      : { name: "No official", symbol: "No official" };

  const element = `<div class="card">
  <div class="card__flag">
  <img class="card__flag-picture" src=${country.flags.png} alt=${
    country.name.common
  }/>
  </div>
  <div class="card__details">
    <p class="text text--title">${country.name.common}</p>
    <p class="text text--body">${country.capital[0]}</p>
    <p class="text text--body">${country.region}</p>
    <p class="text text--body">${
      cur ? `${name} ${symbol ? `(${symbol})` : ""}` : "No official"
    }</p>
    <p class="text text--body">${formatCompactNumber(country.population)}</p>
  </div>
</div>`;
  section.innerHTML = element;
};

const renderSpinner = () => {
  const spinner = `<img class="spinner" src="./assets/spinner.svg" />`;
  section.innerHTML = spinner;
};

const clearSection = () => {
  const cta = `<p class="text">Commencez par chercher un pays</p>`;
  section.innerHTML = cta;
};

function formatCompactNumber(number) {
  if (number < 1000) {
    return number;
  } else if (number >= 1000 && number < 1_000_000) {
    return (number / 1000).toFixed(1) + "K";
  } else if (number >= 1_000_000 && number < 1_000_000_000) {
    return (number / 1_000_000).toFixed(1) + "M";
  } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
    return (number / 1_000_000_000).toFixed(1) + "B";
  } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
    return (number / 1_000_000_000_000).toFixed(1) + "T";
  }
}

const init = () => {
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = queryTxt.value;
    getData(query);
    queryTxt.value = "";
  });
};

init();
