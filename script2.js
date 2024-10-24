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

async function getJSON(url, options, errorMsg = "Something went wrong...") {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(errorMsg);
  }
  const APIData = await response.json();
  return APIData;
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
        `https://api.themoviedb.org/3/movie/${movieID}&append_to_response=credits`,
        options
      );
      InfoList.push(movieInfo);
    }

    return InfoList;
  } catch (error) {
    console.log(error);
  }
}

const printMovieList = async () => {
  const moviesList = await getMoviesInfo();
  console.log(moviesList);
};

printMovieList();
//const MyObject = printMovieList();
//console.log(MyObject);
