"use strict";
const API = "https://restcountries.com/v3.1/name";
const formSearch = document.getElementById("form-search");
const queryTxt = document.getElementById("query-txt");

const getData = async (country) => {
  try {
    const response = await fetch(`${API}/${country}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
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
