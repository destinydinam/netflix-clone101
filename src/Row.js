import movieTrailer from 'movie-trailer';
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import instance from './axios';
import './row.css';

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const base_url = 'http://image.tmdb.org/t/p/';
  const [trailerUrl, setTrailerUrl] = useState('');
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(fetchUrl);
        setMovies(response.data.results);
      } catch (error) {
        setIsError(true);
        setErrorMsg(error.message);
      }
    };

    fetchData();
  }, [fetchUrl]);

  const opts = {
    width: '100%',
    height: '300',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleTrailer = async (movie) => {
    const toggleTrailer = () => {
      setShowTrailer((current) => !current);
    };
    toggleTrailer();
    movieTrailer(movie.name ? movie.name : movie.original_title)
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {isError ? (
          <h2>{errorMsg}</h2>
        ) : (
          movies.map((movie) => (
            <img
              className={`row__poster ${isLargeRow && `row__posterLarger`}`}
              key={movie.id}
              onClick={() => handleTrailer(movie)}
              src={`${base_url}w300${
                isLargeRow ? movie.backdrop_path : movie.poster_path
              }`}
              alt={movie.name}
            />
          ))
        )}
      </div>
      <div>
        {showTrailer && <YouTube videoId={trailerUrl} opts={opts}></YouTube>}
      </div>
    </div>
  );
};

export default Row;
