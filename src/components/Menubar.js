import React from "react";
import "./Menubar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg";
import axios from "axios";

const Menubar = ({ handleSubmit, handleBrowse, isLoggedIn }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };
  return (
    <>
      <div className="menu-bar">
        <img
          src={logo}
          alt="tmdb-logo"
          width="154"
          heigh="30"
          className="tmdb-logo"
        />
        <ul>
          <li>
            <Link to={"/movies"}>Home</Link>
          </li>
          <li>
            <a>
              Movies <i className="fas fa-caret-down"></i>
            </a>

            <div className="dropdown-menu">
              <ul>
                <li>
                  <Link
                    to={"/movies"}
                    id="popular"
                    onClick={handleBrowse}
                    type="movie"
                  >
                    Popular
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/movies"}
                    id="top_rated"
                    onClick={handleBrowse}
                    type="movie"
                  >
                    Top Rated
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/movies"}
                    id="upcoming"
                    onClick={handleBrowse}
                    type="movie"
                  >
                    Upcoming
                  </Link>
                </li>
                <li>
                  <Link to={"/movies"}>
                    Search <i className="fas fa-caret-down"></i>
                  </Link>
                  <div className="dropdown-menu-1">
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        placeholder="Search Movie..."
                        className="searchBar"
                      />
                    </form>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a id="tv" className="type">
              TV <i className="fas fa-caret-down"></i>
            </a>
            <div className="dropdown-menu">
              <ul>
                <li>
                  <Link
                    to={"/tv"}
                    id="popular"
                    type="tv"
                    onClick={handleBrowse}
                  >
                    Popular
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/tv"}
                    id="top_rated"
                    type="tv"
                    onClick={handleBrowse}
                  >
                    Top Rated
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/tv"}
                    id="on_the_air"
                    type="tv"
                    onClick={handleBrowse}
                  >
                    On the Air
                  </Link>
                </li>
                <li>
                  <Link to={"/tv"}>
                    Search <i className="fas fa-caret-down"></i>
                  </Link>
                  <div className="dropdown-menu-1">
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        placeholder="Search TV..."
                        className="searchBar"
                      />
                    </form>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li>
            {!isLoggedIn ? (
              <Link to={"/login"}>Login</Link>
            ) : (
              <>
                <Link to={"/login"} id="username">
                  {isLoggedIn}
                  <i className="fas fa-caret-down"></i>
                </Link>
                <div className="dropdown-menu">
                  <ul>
                    <li>
                      <Link to={"/favorites"}>favorites</Link>
                    </li>
                    <li>
                      <Link to={"/login"}>
                        <div onClick={handleLogout}>Logout</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </li>
        </ul>
      </div>
      <div className="hero">&nbsp;</div>
    </>
  );
};

export default Menubar;
