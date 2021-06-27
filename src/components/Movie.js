import React from "react";

const IMAGE_API = "https://image.tmdb.org/t/p/w500";

const setVoteClass = vote => {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 6) {
    return "orange";
  } else {
    return "red";
  }
};
const Movie = ({ title, poster_path, overview, popularity, vote_average }) => (
  <div className="movie">
    <img
      src={
        poster_path
          ? IMAGE_API + poster_path
          : "https://cdn-s3.allmusic.com/release-covers/500/0003/271/0003271209.jpg"
      }
      alt={title}
    />
    <div className="movie-info">
      <h3>{title}</h3>
      <span className={`tag ${setVoteClass(vote_average)}`}>
        {vote_average}
      </span>
    </div>
    <div className="movie-popularity text-center">
      <h2>Popularity:</h2>
      <p>{popularity}</p>
    </div>
    <div className="movie-over text-center">
      <h2>Overview:</h2>
      <p>{overview}</p>
    </div>
  </div>
);
export default Movie;
