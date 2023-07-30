"use strict";
const API = "https://restcountries.com/v3.1/name";
const section = document.getElementById("section");
const formSearch = document.getElementById("form-search");
const queryTxt = document.getElementById("query-txt");

const getData = async (country) => {
  try {
    const response = await fetch(`${API}/${country}`);
    const data = await response.json();
    renderCountry(data);
  } catch (error) {
    alert(`Non trouvé: ${country}`);
  }
};

const renderCountry = (data) => {
  const [country] = data;
  const element = `<div class="card">
  <div class="card__flag">
  <img class="card__flag-picture" src=${country.flags.png} alt=${country.name.common}/>
  </div>
  <div class="card__details">
    <p class="text text--title">${country.name.common}</p>
    <p class="text text--body">${country.capital[0]}</p>
    <p class="text text--body">${country.region}</p>
    <p class="text text--body">Currency</p>
    <p class="text text--body">${country.population}</p>
  </div>
</div>`;
  section.innerHTML = element;
};

const init = () => {
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = queryTxt.value;
    getData(query);
    queryTxt.value = "";
  });
};

init();
