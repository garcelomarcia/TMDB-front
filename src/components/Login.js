import React, { useState } from "react";
import axios from "axios";

const Login = ({ login }) => {
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setUser({
      ...user,
      [evt.target.name]: value,
    });
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

  const handleLogin = (e) => {
    e.preventDefault();
    login(user);
  };
  return (
    <div className="login">
      <form className="form" onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
          <button type="button" onClick={handleSignup}>
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
