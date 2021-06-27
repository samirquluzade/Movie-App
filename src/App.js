import React, { useState, useEffect } from "react";
import Movie from "./components/Movie";

const POPULARITY_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=da87305730cdaf30e1b638b8ea181780";
const THEATRE_API =
  "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=da87305730cdaf30e1b638b8ea181780";
const POPULAR_KIDS_API =
  "https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=da87305730cdaf30e1b638b8ea181780";
const BEST_DRAMA_API =
  "https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=da87305730cdaf30e1b638b8ea181780";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=da87305730cdaf30e1b638b8ea181780&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeClass, setActiveClass] = useState(true);
  const [toggleClass, setToggleClass] = useState(false);
  const [isComputer, setIsComputer] = useState(window.innerWidth < 872);

  useEffect(() => {
    getMovies(POPULARITY_API);
    window.addEventListener(
      "resize",
      () => {
        const iscomputer = window.innerWidth < 872;
        if (iscomputer !== isComputer) setIsComputer(iscomputer);
        setToggleClass(false);
        setActiveClass(true);
      },
      false
    );
  }, [isComputer]);

  const getMovies = api => {
    fetch(api)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
      });
  };
  const handleOnSubmit = event => {
    event.preventDefault();
    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm("");
    }
  };
  const handleOnChange = event => {
    setSearchTerm(event.target.value);
  };
  const menuHandler = () => {
    setActiveClass(false);
    setToggleClass(!toggleClass);
  };
  const theatreHandler = event => {
    event.preventDefault();
    getMovies(THEATRE_API);
  };
  const popularHandler = event => {
    event.preventDefault();
    getMovies(POPULARITY_API);
  };
  const popularKidsHandler = event => {
    event.preventDefault();
    getMovies(POPULAR_KIDS_API);
  };
  const bestDramaHandler = event => {
    event.preventDefault();
    getMovies(BEST_DRAMA_API);
  };
  return (
    <>
      <header>
        <div className="menu-bar" onClick={menuHandler}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={activeClass && !toggleClass ? "buttondiv" : "display"}>
          <button onClick={theatreHandler}>Theatre movies</button>
          <button onClick={popularHandler}>Popular movies</button>
          <button onClick={popularKidsHandler}>Popular kids movies</button>
          <button onClick={bestDramaHandler}>Best Drama</button>
        </div>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div
        className={!activeClass && toggleClass ? "menubuttondiv" : "display"}
      >
        <button onClick={theatreHandler}>Theatre movies</button>
        <button onClick={popularHandler}>Popular movies</button>
        <button onClick={popularKidsHandler}>Popular kids movies</button>
        <button onClick={bestDramaHandler}>Best Drama</button>
      </div>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map(movie => <Movie {...movie} key={movie.id} />)}
      </div>
    </>
  );
}

export default App;
