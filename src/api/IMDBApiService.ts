const apiKey = "k_k42v67iw";


export const getMoviesInTheaters = () => {
  return fetch("https://imdb-api.com/en/API/InTheaters/" + apiKey).then((res) => {
    return res.json();
  })
}

export const getMoviesByGenreOnly = (genre:string) => {
  return fetch(`https://imdb-api.com/en/API/AdvancedSearch/${apiKey}/?genres=${genre}`).then((res) => {
    return res.json();
  })
}

export const getMoviesBySearchTitle = (searchMovie:string) => {
  return fetch(`https://imdb-api.com/en/API/SearchMovie/${apiKey}/${searchMovie}`).then((res) => {
      return res.json();
    })
}

export const getMovieById = (movieId:string) => {
  return fetch(`https://imdb-api.com/en/API/Title/${apiKey}/${movieId}`).then((res) => {
    return res.json();
  })
}

export {};


