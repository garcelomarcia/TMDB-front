import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: null, password: null });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setUser({
      ...user,
      [evt.target.name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`https://tmdb-back-w5b3.onrender.com/api/login`, { ...user })
        .then((res) => res.data)
        .then((token) => {
          localStorage.setItem("token", token);
        });
      await axios;
      axios
        .get("/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => res.data)
        .then((user) => {
          alert(`Logged in ast ${user.username}`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post(`https://tmdb-back-w5b3.onrender.com/api/signup`, { ...user })
      .then((res) => res.data)
      .then((user) => {
        alert(`New user created ${user.username}`);
      })
      //   .then(() => navigate("/"))
      .catch(() => alert("Signup Failed"));
  };

  return (
    <div className="login">
      <form className="form">
        <h3>Login/Signup</h3>
        <input
          type="text"
          placeholder="Username"
          required
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <div className="login-buttons">
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
          <button type="submit" onClick={handleSignup}>
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
