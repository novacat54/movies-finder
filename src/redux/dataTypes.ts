export type Movie = {
  id: string,
  contentRating: string,
  title: string,
  image: string,
  imDbRating: string,
  plot: string,
}

export type MovieItemProps = {
  movie: Movie,
}