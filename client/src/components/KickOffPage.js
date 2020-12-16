import React, { useEffect, useState } from 'react';
import KickoffPanel from "./panels/KickoffPanel";
import "../styles/KickoffPage.css";
import axios from "axios";


export default function KickOffPage(props) {

    const [groupData, setGroupData] = useState({})


    useEffect(() => {
        let kickoffId = props.match.params.id
        // console.log(kickoffId)
        axios.get("http://localhost:5000/api/groups/" + kickoffId)
            .then((response) => {
                setGroupData(response.data)
                // console.log(response.data)
            }
            );

    }, [props]);

    return (
        <div className="kick-off-container">
            <KickoffPanel className="kickoff-page-panel" />
            <div className="kickoff-single-page">
                <h2 className="kickoff-page-title">{groupData.name}</h2>
                <div>
                    <img className="group-main-pic" src={groupData.photo} alg={groupData.name} />
                    <div>
                        <h4>Description</h4>
                    </div>
                </div>
            </div>

        </div>
    )
}
