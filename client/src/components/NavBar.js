import React, { useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import "../styles/Navbar.css"
import * as Bs from "react-icons/bs";

import UserContext from "../context/UserContext";



export default function NavBar() {
    const { userData, setUserData } = useContext(UserContext);

    const history = useHistory();

    const redirectToDashboard = () => {
        history.push("/room");
    }
    const toLandingPage = () => {
        if (userData.user) {
            history.push("/room");

        } else {
            history.push("/");
        }
    }

    useEffect(() => {
        if (userData.user) {
            redirectToDashboard()
        }
    }, []);


    return (
        <nav>
            <h1 onClick={toLandingPage}>Kickoff</h1>
            {
                userData.user && <>
                    <div className="nav-icons-container">
                        <div className="icon-info">
                            <Bs.BsSearch className="nav-icon" />
                            <p>Search</p>
                        </div>
                        <div className="icon-info">
                            <div className="nav-user-icon nav-icon"></div>
                            <p>Account</p>
                        </div>
                    </div>
                </>
            }

        </nav>
    )
}
