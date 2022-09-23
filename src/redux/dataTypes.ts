export type Item = {
  id: string,
  contentRating: string,
  title: string,
  image: string,
  imDbRating: string,
  plot: string,
}

export type RequestParams = {
  searchMovie: string,
  genre: string,
}