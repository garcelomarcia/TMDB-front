import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Favorites = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [deletedId, setDeletedId] = useState(null); // New state variable to store the deleted id

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

  const handleDelete = (e) => {
    const path = e.target.previousSibling.href.split("/");
    const id = path[path.length - 1];
    const type = path[path.length - 2];

    if (type === "movies") {
      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.media_id !== id)
      );
    } else {
      setTv((prevTv) => prevTv.filter((show) => show.media_id !== id));
    }
    setDeletedId(id);
  };

  useEffect(() => {
    if (deletedId) {
      axios
        .delete(
          `https://tmdb-back-w5b3.onrender.com/api/favorites/${deletedId}`
        )
        .then(() => {
          // Reset the deletedId state variable after successful deletion
          setDeletedId(null);
        });
    }
  }, [deletedId]);

  return (
    <div className="favorites">
      <h1>Movies</h1>
      <div className="favorite-collection">
        {movies.map((movie, i) => {
          return (
            <div key={i}>
              <Link to={`http://localhost:3000/movies/${movie.media_id}`}>
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
              <Link to={`http://localhost:3000/tv/${show.media_id}`}>
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
