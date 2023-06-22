import React from "react";
import { Link, useLocation } from "react-router-dom";

const Grid = ({ movies }) => {
  const { pathname } = useLocation();
  if (pathname === "/") return <h1 className="welcome"> Welcome to TMDB</h1>;
  return (
    <div className="grid">
      {movies.map((movie, i) => {
        return (
          <div key={i}>
            <Link to={`${pathname}/${movie.id}`}>
              <img
                className="card"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
