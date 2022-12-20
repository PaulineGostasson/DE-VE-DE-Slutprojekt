// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  doc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL8utZBBlMUt20czvbrG-T9KTWkvfX0nU",
  authDomain: "de-ve-de-f35fc.firebaseapp.com",
  projectId: "de-ve-de-f35fc",
  storageBucket: "de-ve-de-f35fc.appspot.com",
  messagingSenderId: "889379587632",
  appId: "1:889379587632:web:4098cef7c9f3cb1097cff5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const inputTitle = document.querySelector("#title");
const inputGenre = document.querySelector("#genre");
const inputRelease = document.querySelector("#releaseDate");
const addBtn = document.querySelector("#add-movie");
const showMoviesBtn = document.querySelector("#showMyMovies");
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchWindow");

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

async function getMovieLibrary() {
  const myMovies = await getDocs(collection(db, "movies"));
  myMovies.forEach((movie) => {
    console.log(movie.data());
  });

  showLibrary(myMovies);
  addDeleteBtns();
}

function showLibrary(movies) {
  var parentDiv = document.getElementById("parent-div");
  var parentDivSearched = document.getElementById("searched-movie-id");
  if (parentDiv) {
    console.log("div finns");
    parentDiv.innerHTML = "";
    parentDiv.classList.toggle("hidden");
  } else {
    console.log("div finns inte");
    parentDiv = document.createElement("div");
    parentDiv.id = "parent-div";
    if (parentDivSearched) {
      parentDivSearched.innerHTML = "";
    }
  }

  movies.forEach((movie) => {
    console.log("deletebuttonsEventlisteners:" + movie.id);
    const movieTitle = movie.data().title;
    const validMovieTitle = movieTitle
      .replaceAll(" ", "z")
      .replaceAll(",", "z")
      .replaceAll("!", "z")
      .replaceAll("?", "z")
      .replaceAll(".", "z");
    let elem = document.createElement("article");

    elem.innerHTML = `<div id="${validMovieTitle}">
          <h1 class="movieTitle">${movie.data().title}</h1>
          <p class="movieGenre">Genre: ${movie.data().genre}</p>
          <p class="movieRelease">Release Date: ${movie.data().releaseDate}</p>
          <button class="deleteBtn" movie-name="${validMovieTitle}"
          movie-data-id="${movie.id}">Delete movie!</button>
          </div>`;

    parentDiv.appendChild(elem);
  });

  document.body.appendChild(parentDiv);
}

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

async function deleteMovieFromDatabase(movieId) {
  try {
    await deleteDoc(doc(db, "movies", movieId));
  } catch (error) {
    console.log("ERROR", error);
  }
}

function showSearched(movie) {
  var parentDiv = document.getElementById("searched-movie-id");
  if (parentDiv) {
    parentDiv.innerHTML = "";
  } else {
    parentDiv = document.createElement("div");
    parentDiv.id = "searched-movie-id";
  }

  const movieTitle = movie.data().title;
  const validMovieTitle = movieTitle
    .replaceAll(" ", "z")
    .replaceAll(",", "z")
    .replaceAll("!", "z")
    .replaceAll("?", "z")
    .replaceAll(".", "z");
  let elem = document.createElement("article");

  elem.innerHTML = `
  <div id="${validMovieTitle}">
      <h1 class="movieTitle">${movie.data().title}</h1>
      <p class="movieGenre">Genre: ${movie.data().genre}</p>
      <p class="movieRelease">Release Date: ${movie.data().releaseDate}</p>
      <button class="deleteBtn" movie-title="${validMovieTitle}"
      movie-data-id="${movie.id}">Delete movie!</button>
      <button class="ReturnBtn" id="return">Return Home!</button>
  </div>
  `;

  parentDiv.appendChild(elem);
  document.body.appendChild(parentDiv);

  const returnBtn = document.querySelector("#return");
  returnBtn.addEventListener("click", () => {
    parentDiv.innerHTML = "";
    searchInput.value = "";
  });
}

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

async function searchFunction(searchResult) {
  const movie = await findMovie(searchResult);
  const movieId = movie.id;
  if (movieId) {
    console.log(movie.data().title);
    showSearched(movie);
    addDeleteBtns();
  } else {
    alert("I cant find a movie with this name in your library...");
  }
}

function searchMovie() {
  const searchResult = searchInput.value;
  console.log("click");
  searchFunction(searchResult);
}
