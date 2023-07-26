"use strict";
const API = "https://restcountries.com/v3.1/name/usa";

const getData = () => {
  fetch(API)
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};

const init = () => {
  getData();
};

init();
