import React, { useState, usecontext } from 'react'
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function Homepage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //creating a history to redirect
    const history = useHistory();


    const usernameValue = (event) => {
        setUsername(event.target.value);
    }

    const passwordValue = (event) => {
        setPassword(event.target.value);
    }


    const submitForm = async (event) => {
        event.preventDefault();

        try {
            const loginUser = { username, password };

            //login the user
            console.log(loginUser);
            setPassword("");
        }
        catch {

        }
    }





    return (
        <div className="container-md">
            <div className="welcome-container card align-items-center">
                <div className="card-body">
                    <h2 className="card-title">Welcome to Kickoff!</h2>
                    <form onSubmit={submitForm} className="align-items-center">
                        <input className="" onChange={usernameValue} type="text" placeholder="Username" />
                        <input className="row" onChange={passwordValue} type="password" placeholder="Password" value={password} />
                        <div>
                            <button >Forgot Password </button>
                            <input type="submit" value="Login" />
                        </div>
                    </form>
                    <button>Create New Account</button>

                </div>
            </div>
        </div>
    )
}
