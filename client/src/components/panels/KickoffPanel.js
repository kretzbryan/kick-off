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
            <KickoffLink title="random-title1" />
            <KickoffLink title="random-title2" />
            <KickoffLink title="random-title3" />
            <KickoffLink title="random-title4" />
            <KickoffLink title="random-title5" />
            <KickoffLink title="random-title6" />
            <KickoffLink title="random-title7" />
            {
                userData.user &&
                <>
                    {
                        // this will iterate over the array of user kickoffs and if the array is empty, it will display a message that says: no kickoff are addded (yet)
                        userData.user.createdKickoffs > 0 ?
                            userData.user.createdKickoffs.map((kickoff) => {
                                return < KickoffLink title={kickoff.title} />
                            })
                            :
                            <p>
                                You don't have any kickoffs
                            </p>
                    }
                </>
            }

        </div >
    )
}
