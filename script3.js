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
    //console.log(APIData, "step 1");
    //console.log(APIData.results, "results/step1");
    return APIData.results;
  } catch (APIError) {
    console.error(APIError);
    return APIError;
  }
}

async function getMixedJSON(
  url,
  options,
  errorMsg = "Something went wrong..."
) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(errorMsg);
    }
    const APIData = await response.json();
    //console.log(APIData, "step 1");
    //console.log(APIData.results, "results/step1");
    return APIData;
  } catch (APIError) {
    console.error(APIError);
    return APIError;
  }
}

async function getMovieCredits(myID, myMovie) {
  const movieDetails = await getMixedJSON(
    `https://api.themoviedb.org/3/movie/${myID}?append_to_response=credits&language=en-US`,
    myOptions
  );
  console.log(movieDetails, "step3");
  const castDetails = movieDetails.credits.cast;
  //console.log(castDetails);
  for (let actor of castDetails) {
    //console.log(actor.name, actor.character);
    const actorName = actor.name;
    const characterName = actor.character;
    const actorNode = document.createElement("span");
    actorNode.innerHTML = `<span class='actor'>${actorName} played as ${characterName}<br></span>`;
    myMovie.appendChild(actorNode);
  }
}

async function insertMovieData(myName, baseNode) {
  const myResponse = await getJSON(
    `https://api.themoviedb.org/3/search/movie?query=${myName}`,
    myOptions
  );
  console.log(myResponse, "step2");
  for (let movie of myResponse) {
    const movieID = movie.id;
    const poster = movie.poster_path;
    console.log(poster);
    const movieElement = `<div id=${movieID} class="movie">
    <span class="title">${movie.title}</span>
    <img src="https://media.themoviedb.org/t/p/w220_and_h330_face${poster}" alt='poster_film' /></div>`;
    baseNode.insertAdjacentHTML("beforeend", movieElement);
  }
  const movieNodes = document.querySelectorAll(".movie");
  for (let movieDiv of movieNodes) {
    movieDiv.addEventListener("click", async () => {
      const divID = movieDiv.getAttribute("id");
      console.log(divID);
      getMovieCredits(divID, movieDiv);
    });
  }
}

inputButton.addEventListener("click", () => {
  const movieName = inputTag.value;
  console.log(movieName);
  insertMovieData(movieName, containerNode);
});
