import React, { useState, usecontext } from 'react'
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function Homepage() {
    const [username, setUsername] = useState();
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
        <div>
            <div className="welcome-container">
                <h2>Welcome to Kickoff!</h2>
                <form onSubmit={submitForm}>
                    <input onChange={usernameValue} type="text" placeholder="Username" />
                    <input onChange={passwordValue} type="password" placeholder="Password" value={password} />
                    <button >Forgot Password </button>
                    <input type="submit" value="Login" />
                </form>
                <button>Create New Account</button>
            </div>
        </div>
    )
}
