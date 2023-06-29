import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Favorites = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  // const [deletedId, setDeletedId] = useState(null); // New state variable to store the deleted id

  const handleDelete = (e) => {
    // ...

    let updatedMovies, updatedTv;

    if (type === "movies") {
      updatedMovies = movies.filter((movie) => movie.media_id !== id);
      setMovies(updatedMovies); // Update state immediately
    } else {
      updatedTv = tv.filter((show) => show.media_id !== id);
      setTv(updatedTv); // Update state immediately
    }

    // setDeletedId(id);

    axios
      .delete(`https://tmdb-back-w5b3.onrender.com/api/favorites/${id}`)
      .then(() => {
        // Deletion was successful, no action needed
      })
      .catch((error) => {
        // Deletion failed, revert the changes made to the UI
        if (type === "movies") {
          setMovies([...movies]); // Revert the state to the original value
        } else {
          setTv([...tv]); // Revert the state to the original value
        }
        // setDeletedId(null);
        console.error("Failed to delete favorites:", error);
      });
  };

  // useEffect(() => {
  //   if (deletedId) {
  //     axios
  //       .delete(
  //         `https://tmdb-back-w5b3.onrender.com/api/favorites/${deletedId}`
  //       )
  //       .then(() => {
  //         // Reset the deletedId state variable after successful deletion
  //         setDeletedId(null);
  //       });
  //   }
  // }, [deletedId]);

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
