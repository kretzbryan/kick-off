import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import KickoffLink from "../links/KickOffLink";
import "../../styles/KickoffPanel.css";


export default function KickoffPanel() {
    ////grabbing the users info (kickoffs)
    const { userData, setUserData } = useContext(UserContext);

    useEffect(() => {

    }, []);

    return (
        <div className="kickoff-side-panel">
            <h5>Your Kickoffs</h5>

            <div className="side-panel-links-container">
                <Link to="/kickoffInfo/5fda729eeddafacf65f589b4"> Random title1 </Link>
                <Link to="/kickoffInfo/5fda6e0059c39618d77a4d91"> Random title2 </Link>
                <Link to="/kickoffInfo/5fda6e8659c39618d77a4d93"> Random Title3
                </Link>
                <Link to="/kickoffInfo/5fda6f4d59c39618d77a4d94"> Random Title4
                </Link>
                <Link to="/kickoffInfo/5fda6fde59c39618d77a4d95"> Random Title5
                </Link>
                {
                    userData.user &&
                    <>
                        {
                            // this will iterate over the array of user kickoffs and if the array is empty, it will display a message that says: no kickoff are addded (yet)
                            userData.user.createdKickoffs > 0 ?
                                userData.user.createdKickoffs.map((kickoff) => {
                                    return (
                                        <Link to={"/kickoffInfo/" + kickoff._id}>
                                            kickoff.title
                                        </Link>
                                    )
                                })
                                :
                                <p>
                                    You don't have any kickoffs
                            </p>
                        }
                    </>
                }

            </div>

        </div >
    )
}
