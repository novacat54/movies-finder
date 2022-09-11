import SearchPageCss from './SearchPage.module.css'

function SearchPage() {
  return (
     <div className={SearchPageCss.searchComponents}>
        <div>
          <input className={SearchPageCss.searchField} placeholder='Search for a movie...'></input>
          <button className={SearchPageCss.searchButton}></button>
        </div>

        <select className={SearchPageCss.genres} name="genres" id="genres">
          <option value="comedy">Comedy</option>
          <option value="horror">Horror</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="thriller">Thriller</option>
          <option value="action">Action</option>
          <option value="adventure">Adventure</option>
        </select>
     </div>
  )
}

export default SearchPage;