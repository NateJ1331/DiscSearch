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

function compareMovies(a,b) {
    if (a.Title < b.Title) {
        return -1;
    } else if (a.Title > b.Title) {
        return 1;
    }
    return 0;
    }

async function main() {
    let movies = await getData();
    let sortedMovies = movies.sort(compareMovies);
    console.log(sortedMovies);
}

main();