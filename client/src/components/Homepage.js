import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/Homepage.css";

///importing userContext
import UserContext from "../context/UserContext";

///importing icons from react-icons after installation
import * as Bi from "react-icons/bi";
// import { response } from 'express';

export default function Homepage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //User
  const { setUserData } = useContext(UserContext);

  //creating a history to redirect
  const history = useHistory();

  const usernameValue = (event) => {
    setUsername(event.target.value);
  };

  const passwordValue = (event) => {
    setPassword(event.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const loginUser = { username, password };
      const loginResponse = await axios.post(
        "http://localhost:5000/api/user/login",
        loginUser
      );

      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });

      localStorage.setItem("auth-token", loginResponse.data.token);

      //login the user
      console.log(loginResponse);
      setPassword("");
      history.push("/room");
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    <div className="main-container homepage">
      <div className="homepage-top">
        <h3 className="">
          Sharing Experiences, <br /> Safely.
        </h3>
        <div className="welcome-container">
          <div className="card-body">
            <h3 className="card-title">Welcome!</h3>
            <form onSubmit={submitForm} className="form-group">
              <input
                className="form-control"
                onChange={usernameValue}
                type="text"
                placeholder="Username"
              />
              <input
                className="form-control"
                onChange={passwordValue}
                type="password"
                placeholder="Password"
                value={password}
              />
              <div className="input-group row justify-content-around">
                <a href="#" className="create-new-acc-btn">
                  Create New Account +
                </a>

                <button type="submit" className="wc-login-btn">
                  Login <Bi.BiLogIn />{" "}
                </button>
              </div>
            </form>
            <Link id="fpLink">Forgot Password </Link>
          </div>
        </div>
      </div>
      <div className="welcome-image-container"></div>
    </div>
  );
}
