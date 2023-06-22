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

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://187.162.118.101:3000/api/login`,
        { ...user },
        { withCredentials: true, credentials: "include" }
      )
      .then((res) => res.data)
      .then((user) => {
        alert(`Logged in as ${user.username}`);
      })
      .then(() => navigate("/"))
      .catch(() => alert("Login Failed"));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post(`http://187.162.118.101:3000/api/signup`, { ...user })
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
