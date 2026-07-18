let movieContainer = document.querySelector('#movieContainer');
let searchButton = document.querySelector('#searchButton');
let movies = []
searchButton.addEventListener('click',search);

async function getData() {
  const url = "Data/Test_Data.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}
async function setData() {
    movies = await getData();
}
setData()

function search(){
  let movieQuery = document.querySelector('#search').value;
  movieQuery = movieQuery.toLowerCase();

  console.log(movies)

  let filteredMovies = movies.filter(function(movie){
    return(
      movie.Title.toLowerCase().includes(movieQuery) ||
      movie.Genre.toLowerCase().includes(movieQuery) ||
      movie.Year == movieQuery 
    )
  })

  let sortedMovies = filteredMovies.sort(compareMovies)

  // console.log(sortedMovies)

  function compareMovies(a,b) {
    if (a.Title < b.Title) {
      return -1;
    } else if (a.Title > b.Title) {
      return 1;
    }
      return 0;
    }

    movieContainer.innerHTML = "";
    sortedMovies.forEach(function(movie){
      renderMovie(movie)
    })
}

function movieTemplate(movie){
  return `
    <div class = "movie">
        <p class = "movieTitle">Name: ${movie.Title}</p>
        <p class = "movieGenre">Genre: ${movie.Genre}</p>
        <p class = "movieYear">Year: ${movie.Year}</p>
        <p class = "movieRating">Rating: ${movie.Rating}</p>
        <p class = "movieSeries">Series #: ${movie["Series #"]}</p>
        <p class = "movieWatched">Watched: ${movie.Watched}</p>
        <p class = "movieDamaged">Damaged: ${movie.Damaged}</p>
        <p class = "moviePaid">Paid: ${movie.Paid}</p>
        <p class = "moviePrice">Price: ${movie.Price}</p>
        <p class = "movieNotes">Notes: ${movie.Notes}</p>
        <p>-------------------------------------------------------------------</p>
    </div>
  `
}

function renderMovie(movie) {
    let html = movieTemplate(movie);
    movieContainer.innerHTML += html
}

