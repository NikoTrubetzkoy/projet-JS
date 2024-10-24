"use strict";

const myOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2VmZjRlMWM5YTY2NDg5OTY1YTRlYmYwMjcwZjIwYyIsIm5iZiI6MTcyOTY3MTQzNy4yMzY0NjQsInN1YiI6IjVkZGQ0NzIwZThkMGI0MDAxMWY5ZDcxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TCs8tVp3adgjNEPRnFjxgmAdDe0c4KOH43KeS0FHL5w",
  },
};

const inputButton = document.querySelector(".button");
const inputTag = document.getElementById("movieName");
const movieName = inputTag.value;
const containerNode = document.querySelector(".container");
//console.log(movieName);

//
async function getJSON(url, options, errorMsg = "Something went wrong...") {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(errorMsg);
    }
    const APIData = await response.json();
    console.log(APIData, "step 1");
    console.log(APIData.results, "results/step1");
    return APIData.results;
  } catch (APIError) {
    console.error(APIError);
    return APIError;
  }
}

inputButton.addEventListener("click", () => {
  const movieName = inputTag.value;
  console.log(movieName);
  const insertMovieData = async () => {
    const myResponse = await getJSON(
      `https://api.themoviedb.org/3/search/movie?query=${movieName}`,
      myOptions
    );
    console.log(myResponse, "step2");
    for (let movie of myResponse) {
      //console.log(movie, movie.title);
      //containerNode.innerHTML += `<div>Titre : ${movie.title}</div>`;
      const movieElement = `<div class="movie">Titre : ${movie.title}</div>`;
      containerNode.insertAdjacentHTML("beforeend", movieElement);
    }
  };
  insertMovieData();
});
