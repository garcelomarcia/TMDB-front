import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Favorites = ({ user }) => {
  const { pathname } = useLocation();
  const domain = pathname.split("/")[0]
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);

  const handleDelete = (e) => {
    const path = e.target.previousSibling.href.split("/");
    const id = path[path.length - 1];
    axios
      .delete(`https://tmdb-back-w5b3.onrender.com/api/favorites/${id}`)
      .then(() => window.location.reload())
      .catch((error) => {
        console.error("Failed to delete favorites:", error);
      });
  };

  useEffect(() => {
    if (user) {
      axios
        .post(`https://tmdb-back-w5b3.onrender.com/api/favorites`, {
          username: user,
        })
        .then((res) => {
          setMovies(res.data.movieList);
          setTv(res.data.tvList);
        });
    }
  }, [user]);

  return (
    <div className="favorites">
      <h1>Movies</h1>
      <div className="favorite-collection">
        {movies.map((movie, i) => {
          return (
            <div key={i}>
              <Link to={`${domain}/movies/${movie.media_id}`}>
                <img
                  className="card"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
              </Link>
              <img
                className="trash"
                src={"https://img.icons8.com/emoji/512/wastebasket-emoji.png"}
                onClick={handleDelete}
              />
            </div>
          );
        })}
      </div>
      <h1>TV</h1>
      <div className="favorite-collection">
        {tv.map((show, i) => {
          return (
            <div key={i}>
              <Link to={`${domain}/tv/${show.media_id}`}>
                <img
                  className="card"
                  src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                />
              </Link>
              <img
                className="trash"
                src={"https://img.icons8.com/emoji/512/wastebasket-emoji.png"}
                onClick={handleDelete}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
