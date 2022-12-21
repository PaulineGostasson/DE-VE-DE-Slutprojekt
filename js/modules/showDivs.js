// Här har jag mina funktioner som skapar mina "DIV:ar" vilket är när jag ska visa mitt film biblotek eller sökta filmer. Så när man antingen söker
//efter en film eller togglar sitt film biblotek så startar dessa funktionerna och skapar "DIV:ar" på sidan.

const searchInput = document.querySelector("#searchWindow");

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

    elem.innerHTML = `<div class ="movieLibrary" id="${validMovieTitle}">
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

function showSearched(movie) {
  var parentDivLibrary = document.getElementById("parent-div");
  var parentDiv = document.getElementById("searched-movie-id");
  if (parentDiv) {
    parentDiv.innerHTML = "";
  } else {
    parentDiv = document.createElement("div");
    parentDiv.id = "searched-movie-id";
    if (parentDivLibrary) {
      parentDiv.innerHTML = "";
    }
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
  <div class="searchedMovie" id="${validMovieTitle}">
      <h1 class="movieTitle">${movie.data().title}</h1>
      <p class="movieGenre">Genre: ${movie.data().genre}</p>
      <p class="movieRelease">Release Date: ${movie.data().releaseDate}</p>
      <button class="deleteBtn" movie-title="${validMovieTitle}"
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

export { showLibrary, showSearched };
