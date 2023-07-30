"use strict";
const API = "https://restcountries.com/v3.1/name";

const getData = async (country) => {
  try {
    const response = await fetch(`${API}/${country}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const init = async () => {
  getData("usa");
};

init();
