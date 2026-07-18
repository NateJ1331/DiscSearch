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
    if (a.Year < b.Year) {
      return -1;
    } else if (a.Year > b.Year) {
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
        <p class = "movieTitle">${movie.Title}</p>
        <p class = "movieGenre left">Genre: ${movie.Genre}</p>
        <p class = "movieYear right">Year: ${movie.Year}</p>
        <p class = "movieRating left">Rating: ${movie.Rating}</p>
        <p class = "movieSeries right">Series #: ${movie["Series #"]}</p>
        <p class = "movieWatched left">Watched: ${movie.Watched}</p>
        <p class = "movieDamaged right">Damaged: ${movie.Damaged}</p>
        <p class = "moviePaid left">Paid: ${movie.Paid}</p>
        <p class = "moviePrice right">Price: ${movie.Price}</p>
        <p class = "movieNotes">Notes: ${movie.Notes}</p>
    </div>
  `
}

function renderMovie(movie) {
    let html = movieTemplate(movie);
    movieContainer.innerHTML += html
}

