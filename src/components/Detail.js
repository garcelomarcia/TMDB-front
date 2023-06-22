import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import favorite from "../assets/heart-431.svg";

const Detail = (props) => {
  const { pathname } = useLocation();
  const [empty, type, id] = pathname.split("/");
  const [movie, setMovie] = useState({});
  useEffect(() => {
    axios
      .get(`http://187.162.118.101:3000/api/${type}/${id}`)
      .then((result) => setMovie(result.data));
  }, []);
  console.log(movie);

  const addToFavorites = () => {
    const user = document.getElementById("username").textContent;
    axios
      .post(`http://187.162.118.101:3000/api/favorites/${id}`, {
        media_id: id,
        type: type,
        poster_path: movie.poster_path,
        username: user,
      })
      .then(() => alert("Movie added to favorites"))
      .catch(() => alert("Error adding movie to favorites"));
  };

  return (
    <>
      <div
        className="detail"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
          backgroundBlendMode: "multiply",
          objectFit: "cover",
        }}
      >
        <div className="poster">
          <img className="favorite" src={favorite} onClick={addToFavorites} />
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt="notfound"
          />
        </div>
        <div className="info">
          <h1>{movie.title}</h1>
          <h3>{movie.tagline}</h3>
          <p>{movie.overview}</p>
          <div className="production">
            {movie.production_companies ? (
              movie.production_companies.map((company) => {
                return (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                    alt="notfound"
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
