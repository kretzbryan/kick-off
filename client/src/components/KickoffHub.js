import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function KickoffHub() {
    const [groups, setGroups] = useState(null)
    const [kickoffs, setKickoffs] = useState(null)
    const [message, setMessage] = useState("")
    
    useEffect(() => {
        axios.get('groupserverurl').then(res => {
            setGroups(res.data)
        }).catch(err => {
            setMessage(err.message)
        });
        axios.get('kickoffserverurl').then(res => {
            setKickoffs(res.data)
        }).catch(err => {
            setMessage(err.message)
        });
    }, [])

    const groupFunction = () => {
        groups.forEach(group => {
            {group.map((val, key) => {
                return (
                    <div key={key}>
                        <h1>{val.name}</h1>
                        <li>{val.interests[0]}</li>
                        <li>{val.interests[1]}</li>
                        <li>{val.interests[2]}</li>
                    </div>                        )
            })}
        })
    };

    const kickoffFunction = () => {
        kickoffs.forEach(kickoff => {
            {kickoff.map((val, key) => {
                return (
                    <div key={key}>
                        <h1>{val.title}</h1>
                        <p>{val.description}</p>
                        <p>{val.startTime}</p>
                    </div>
                )
            })}
        })
    }


    return (
        <div>
            <div>
                {groupFunction}
            </div>
            <div>
                {kickoffFunction}
            </div>
        </div>
    )
}