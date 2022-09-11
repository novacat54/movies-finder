export type Item = {
  contentRating: string,
  title: string,
  image: string,
  imDbRating: string,
  }
  
  export type MoviesResponse = {
    errorMessage: string;
    items: Item[];
  }

 