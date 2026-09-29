import "./Searchbar.css";

function SearchBar({ placeholder, onSearch }) {
  return (
    <div className="search-container">

      <span className="search-icon">search:</span>

      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />

    </div>
  );
}

export default SearchBar;