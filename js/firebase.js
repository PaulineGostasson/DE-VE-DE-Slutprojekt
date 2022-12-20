 /* Jag valde att dela upp min JS kod i två moduler då det blir mer lättläst och tydligare att förstå, delade upp dem efter innehållet.
 Inne i denna modulen så har jag funktionerna som håller ihop med firebase och även funktioner som visar upp infon på min sida. 
 I min andra modul ligger mina lyssnare mm.*/

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getFirestore, collection, getDocs, addDoc, deleteDoc, query, where } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
  import { removeMovies } from './script.js'
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyBL8utZBBlMUt20czvbrG-T9KTWkvfX0nU",
    authDomain: "de-ve-de-f35fc.firebaseapp.com",
    projectId: "de-ve-de-f35fc",
    storageBucket: "de-ve-de-f35fc.appspot.com",
    messagingSenderId: "889379587632",
    appId: "1:889379587632:web:4098cef7c9f3cb1097cff5"
  };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);

  async function saveToDatabase(movieTitle, movieGenre, movieRelease) {
    try {
        await addDoc(collection(db, 'movies'), {
            title: movieTitle,
            genre: movieGenre,
            releaseDate: movieRelease
        });
    } catch (error) {
        console.log('ERROR', error);
    }
 }

  async function displayAllMovies() {
    const articleEl = document.querySelector('#listMovies');
    articleEl.innerHTML = ``
    try{
    const movies = await getDocs(collection(db, 'movies'));
    console.log(movies);

    movies.forEach((movies) => {
        console.log(movies.id);
        console.log(movies.data());
        const elem = `
                      <section>
                      <br>
                      <li><b>Movies:</b> ${movies.data().title}</li>
                      <li>${movies.data().genre}</li>
                      <li>${movies.data().releaseDate} <button id="remove" movie-ID = ${title.id}>Remove Movie</button></li>
                      <br>
                      </section>`;
            articleEl.insertAdjacentHTML('beforeend', elem);
    });
    removeMovies()
 } catch (error){
    console.log('ERROR', error)
 }
}

 async function deleteMovie(idButton){
    console.log(idButton)

    try{
        await deleteDoc(doc(db,'movies', idButton))

    }catch(error){
       console.log('Error:', error)
    }
}

//funktion som kollar ifall filmen finns
async function searchMovie(){
    const inputSearch = document.querySelector('#movieSearch')
    const search = inputSearch.value
    console.log(search)
    try{
        const myMovie = query (collection(db, 'movies'), where( 'title', '==', search)) // title är namnet på databasen. Search är namnet som vi skriver in i input.
        const searchResult = await getDocs(myMovie)
        let returnResult = {} // ett tomt block där result ska skickas in?
        searchResult.forEach((reResult)=>{
            console.log(reResult)
            returnResult = reResult
            console.log(resultReturn)
        })

        return returnResult

    }catch(error){
        console.log('Error:',error)
    }
}

 // visar sökningen efter film finns filmen visas ett resultat, om inte så sägs det att filmen ej finns.
 async function displaySearchedMovie(movies){

    let searchMovie = document.querySelector('#searchMovie')
    let movieID = movies.id

     if (movieID){

        let searchEl = `<article class="articleSearch"><h2>${movies.data().title}</h2><p>${movies.data().genre}</p>
        <p>${movies.data().releaseDate}</p></article>
        `
        searchMovie.insertAdjacentHTML('beforeend', searchEl);
     }else{
        searchMovie.innerText = 'Filmen du söker efter finns ej här. (TIPS! Du kan lägga till filmen och försöka igen.)'
    }
};
