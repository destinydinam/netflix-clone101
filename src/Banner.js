import { useState, useEffect } from 'react';
import axios from './axios';
import './banner.css';

// WE CAN CHOOSE TO IMPORT REQUESTS DIRECTLY OVER HERE THEN WE
// WILL USE IT IN THE AXIOS.GET BY ADDING ANY OF ITS KEY TO IT
// THAT WAY WE DON'T HAVE TO PASSIT AS A PROP ANYMORE

const Header = ({ fetchUrl }) => {
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const base_url = 'http://image.tmdb.org/t/p/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(fetchUrl);
        setMovie(
          response.data.results[
            Math.floor(Math.random() * response.data.results.length - 1)
          ]
        );
      } catch (error) {
        setIsError(true);
        setErrorMsg(error.message);
      }
    };
    fetchData();
  }, [fetchUrl]);

  return (
    <section>
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie.name ? movie.name : movie.original_title}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h3 className="banner__description">
          {movie.overview
            ? `${movie.overview.slice(0, 140)}...`
            : movie.overview}
        </h3>
      </div>
      <div className="banner__fadebottom"></div>
      {isError ? (
        <h2>{errorMsg}</h2>
      ) : (
        <header
          className="banner"
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${base_url}w300${
              movie.poster_path ? movie.poster_path : movie.backdrop_path
            })`,
            backgroundPosition: 'center center',
          }}
        ></header>
      )}
    </section>
  );
};

export default Header;
