import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Grid from "./components/Grid";
import Detail from "./components/Detail";
import Login from "./components/Login";
import axios from "axios";
import Menubar from "./components/Menubar";
import Favorites from "./components/Favorites";
// import api_key from "../api/config";
const api_key = "a763d45bd50154ae259188fe582406df";
const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoggedIn, setLogin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=a763d45bd50154ae259188fe582406df&language=en-US&query=${title}&page=1&include_adult=false
        `
      )
      .then((result) => setMovies(result.data.results));
  };

  const handleBrowse = (e) => {
    let type = e.target.type;
    let criteria = e.target.id;
    const url = `https://api.themoviedb.org/3/${type}/${criteria}?api_key=${api_key}&language=en-US&page=1`;

    axios.get(url).then((result) => setMovies(result.data.results));
  };

  useEffect(() => {
    axios
      .get("https://187.162.118.101:3000/api")
      .then((result) => setMovies(result.data.results));
    axios
      .get("https://187.162.118.101:3000/api/me")
      .then((res) => res.data)
      .then((user) => {
        console.log(`found user ${user.username}`);
        setLogin(user.username);
      });
  }, [isLoggedIn]);

  return (
    <div>
      <Menubar
        handleSubmit={handleSubmit}
        handleBrowse={handleBrowse}
        isLoggedIn={isLoggedIn}
      />
      <Routes>
        <Route path="/" element={<Grid movies={movies} />} />
        <Route path="/movies" element={<Grid movies={movies} />} />
        <Route path="/tv" element={<Grid movies={movies} />} />
        <Route path="movies/:id" element={<Detail />} />
        <Route path="tv/:id" element={<Detail />} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} />} />
        <Route path="/favorites" element={<Favorites user={isLoggedIn} />} />
      </Routes>
    </div>
  );
};

export default App;
