// JavaScript file for TMDB API application

"use strict";

const IDsList = [];
const InfoList = [];
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2VmZjRlMWM5YTY2NDg5OTY1YTRlYmYwMjcwZjIwYyIsIm5iZiI6MTcyOTY3MTQzNy4yMzY0NjQsInN1YiI6IjVkZGQ0NzIwZThkMGI0MDAxMWY5ZDcxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TCs8tVp3adgjNEPRnFjxgmAdDe0c4KOH43KeS0FHL5w",
  },
};
const container = document.querySelector(".container");
//const moviesLabel

function getJSON(url, options, errorMsg = "Something went wrong...") {
  return fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new Error(errorMsg);
    }
    const APIData = response.json();
    return APIData;
  });
}

function getMoviesInfo() {
  try {
    getJSON("https://api.themoviedb.org/3/movie/changes?page=1", options).then(
      (moviesList) => {
        //console.log(moviesList);
        moviesList.results.forEach((movie) => {
          if (movie.adult === false) {
            IDsList.push(movie.id);
          }
        });
        //console.log(IDsList);
        IDsList.slice(0, 10).forEach((movieID) => {
          getJSON(
            `https://api.themoviedb.org/3/movie/${movieID}&append_to_response=people`,
            options
          ).then((movieInfo) => {
            //console.log(movieInfo);
            InfoList.push(movieInfo);
          });
        });
        //console.log(InfoList);
      }
    );
    return InfoList;
  } catch (error) {
    console.log(error);
  }
}

container.insertAdjacentHTML("afterbegin", "<h2>Liste de films récents</h2>");
//container.append()

//console.log(getMoviesInfo());
getMoviesInfo();
const sameList = InfoList;
//for (let movie of InfoList) {
// console.log(movie);
//}
//console.log(typeof sameList, sameList);
sameList.forEach((movie) => console.log(movie, 2));
console.log("Bidon");

//  https://api.themoviedb.org/3/movie/{movie_id}/credits
