"use strict";

//const IDsList = [];
//const InfoList = [];
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

async function getMoviesInfo() {
  try {
    const moviesList = await getJSON(
      "https://api.themoviedb.org/3/movie/changes?page=1",
      options
    );
    const IDsList = [];
    const InfoList = [];

    moviesList.results.forEach((movie) => {
      if (movie.adult === false) {
        IDsList.push(movie.id);
      }
    });

    for (const movieID of IDsList.slice(0, 10)) {
      const movieInfo = await getJSON(
        `https://api.themoviedb.org/3/movie/${movieID}&append_to_response=people`,
        options
      );
      InfoList.push(movieInfo);
    }

    return InfoList;
  } catch (error) {
    console.log(error);
  }
}

const moviesList = async () => await getMoviesInfo();
console.log(moviesList());
for (let movie of moviesList) {
  console.log(movie.title);
}
