import {
  db,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
} from "./modules/firebase.js";

import { showLibrary, showSearched } from "./modules/showDivs.js";

const inputTitle = document.querySelector("#title");
const inputGenre = document.querySelector("#genre");
const inputRelease = document.querySelector("#releaseDate");
const addBtn = document.querySelector("#add-movie");
const showMoviesBtn = document.querySelector("#showMyMovies");
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchWindow");

//Här börjar min save och deleteToDatabase kod.

async function saveToDatabase(movieGenre, movieTitle, movieRelease) {
  const movieInfo = await findMovie(movieTitle);
  const movieId = movieInfo.id;
  console.log(movieId);
  if (movieId) {
    alert("You already have this movie in your Library.");
  } else {
    if (movieTitle == "") {
      alert("Dont forget to put in the title!");
    } else if (movieGenre == "") {
      alert("Dont forget to put in the genre!");
    } else if (movieRelease == "") {
      alert("Dont forget to add the release date!");
    } else {
      try {
        await addDoc(collection(db, "movies"), {
          genre: movieGenre,
          title: movieTitle,
          releaseDate: movieRelease,
        });
      } catch (error) {
        console.log("ERROR", error);
      }
    }
  }
}

async function deleteMovieFromDatabase(movieId) {
  try {
    await deleteDoc(doc(db, "movies", movieId));
  } catch (error) {
    console.log("ERROR", error);
  }
}

//Här har jag lagt mina eventListeners (Knappar för det mesta) och även funktioner som lägger till knappar.

searchBtn.addEventListener("click", searchMovie);

addBtn.addEventListener("click", () => {
  let movieTitle = inputTitle.value;
  let movieGenre = inputGenre.value;
  let movieRelease = inputRelease.value;
  saveToDatabase(movieGenre, movieTitle, movieRelease);
  inputTitle.value = ``;
  inputGenre.value = ``;
  inputRelease.value = ``;
});

showMoviesBtn.addEventListener("click", () => {
  console.log("Click!");

  getMovieLibrary();
});

function addDeleteBtns() {
  const deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach((button) => {
    button.addEventListener("click", async (event) => {
      console.log("click");
      const movieName = event.target.getAttribute("movie-name");
      const movieElement = document.getElementById(movieName);
      const movieId = event.target.getAttribute("movie-data-id");
      console.log(movieId);

      movieElement.innerHTML = "";
      await deleteMovieFromDatabase(movieId);
    });
  });
}

async function getMovieLibrary() {
  const myMovies = await getDocs(collection(db, "movies")); //Här hämtar jag mina filmer från databasen med getDocs
  myMovies.forEach((movie) => {
    console.log(movie.data());
  });

  showLibrary(myMovies);
  addDeleteBtns();
}

//Här är min findMovie funktion som söker efter film beroende på vad du valt att söka efter på min sida och den söker igenom
//film titlarna på min firebase med query och where anropen och sedan matchar vad dem hittar i min "collection" till det man sökt efter.

async function findMovie(searchResult) {
  try {
    const movieQuery = query(
      collection(db, "movies"),
      where("title", "==", searchResult)
    );
    const endResult = await getDocs(movieQuery);
    let movieInfo = {};

    endResult.forEach((movieResult) => {
      movieInfo = movieResult;
    });

    return movieInfo;
  } catch (error) {
    console.log(error);
  }
}

// Fortsättning på funktionen ovan så när den har hittat filmen så visar den antingen upp resultatet eller om titel ej
//existerar i min firebase skickar den ut ett fel meddelande.
async function searchFunction(searchResult) {
  const movie = await findMovie(searchResult);
  const movieId = movie.id;
  if (movieId) {
    console.log(movie.data().title);
    showSearched(movie);
  } else {
    alert("I cant find a movie with this name in your library...");
  }
}

//Matchar searchInput till resultatet och startar igång searchfunction metoden.
function searchMovie() {
  const searchResult = searchInput.value;
  console.log("click");
  searchFunction(searchResult);
}
