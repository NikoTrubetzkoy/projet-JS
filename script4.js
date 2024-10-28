// basename: script3.js
/* Description: requêtes API sur TMDB.com
*/

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
async function getJSON(
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

async function getMovieCredits(myID) {
  const movieDetails = await getJSON(
    `https://api.themoviedb.org/3/movie/${myID}?append_to_response=credits&language=en-US`,
    myOptions
  );
  console.log(movieDetails, "step3");
  const castDetails = movieDetails.credits.cast;
  //console.log(castDetails);
  const modalDiv = document.getElementById(`mdl${myID}`);
  modalDiv.style.display='block';
  const modalContent = modalDiv.querySelector('.modal-content');
  for (let actor of castDetails) {
    //console.log(actor.name, actor.character);
    const actorName = actor.name;
    const characterName = actor.character;
    const actorNode = document.createElement("span");
    actorNode.setAttribute( 'class', 'actor')
    actorNode.innerHTML = `${actorName} played as ${characterName}<br/>`;
    modalContent.appendChild(actorNode);
  }
  window.onclick = function(event) {
    if (event.target == modalDiv) {
      modalDiv.style.display = "none";
      const modalSpans= modalContent.querySelector('.actor');
      modalContent.removeChild(modalSpans);
    }
  }
  const closeSpan= modalContent.querySelector(".close");
  closeSpan.onclick = function(event) {
    if (event.target == closeSpan) {
      modalDiv.style.display = "none";
      const modalSpans= modalContent.querySelector('.actor');
      modalContent.removeChild(modalSpans);
    }
  }
}

async function insertMovieData(myName) {
  const previousQuery = containerNode.querySelectorAll('.movie');
  console.log(previousQuery, typeof previousQuery);

  for (let previousMovie of previousQuery) {
    containerNode.removeChild(previousMovie);
  }
  const myResponse = await getJSON(
    `https://api.themoviedb.org/3/search/movie?query=${myName}`,
    myOptions
  );
  console.log(myResponse.results);
  for (let movie of myResponse.results) {
    const movieID = movie.id;
    const poster = movie.poster_path;
    //console.log(poster);
    const movieElement = `
    <div id=${movieID} class="movie">
      <img src="https://media.themoviedb.org/t/p/w220_and_h330_face${poster}" alt='poster_film' />
      <span class="title"><br/>${movie.title}</span>
      <button id="btn${movieID}" >See Cast members</button>
      <div id="mdl${movieID}" class="cast-modal">
        <!-- Modal content -->
        <div class="modal-content">
          <header class="modal-header"> 
            <span class="close">&times;</span>
            <h2>CAST :</h2>
          </header>
        </div>
      </div>
    </div>`;
    containerNode.insertAdjacentHTML("beforeend", movieElement);
    //const movieDiv = document.getElementById(movieID);
    document.getElementById(`btn${movieID}`).onclick = async () => {
      getMovieCredits(movieID);
    }
  }
}

inputButton.addEventListener("click", () => {
  const movieName = inputTag.value;
  console.log(movieName);
  insertMovieData(movieName);
});
