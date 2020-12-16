import React, { useState, usecontext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/Homepage.css";

///importing icons from react-icons after installation
import * as Bi from "react-icons/bi";
export default function Homepage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

      //login the user
      console.log(loginUser);
      setPassword("");
    } catch {}
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
                  &nbsp;Create New Account &nbsp; <Bi.BiPlus />
                </a>

                <button type="submit" className="wc-login-btn">
                  Login <Bi.BiLogIn />{" "}
                </button>
              </div>
            </form>
            <Link>Forgot Password </Link>
          </div>
        </div>
      </div>
      <div className="welcome-image-container"></div>
    </div>
  );
}
