const apiKey = "k_k42v67iw";


export const getMoviesInTheaters = () => {
  return fetch("https://imdb-api.com/en/API/InTheaters/" + apiKey).then((res) => {
    return res.json();
  })
}

export const getMoviesBySearchParams = (genre:string) => {
  return fetch(`https://imdb-api.com/en/API/AdvancedSearch/${apiKey}/?${genre}`).then((res) => {
    return res.json();
  })
}

export const getMovieById = (movieId:string) => {
  return fetch(`https://imdb-api.com/en/API/Title/${apiKey}/${movieId}`).then((res) => {
    return res.json();
  })
}

export {};


