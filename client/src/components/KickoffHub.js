import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function KickoffHub() {
    const [groups, setGroups] = useState(null)
    const [kickoffs, setKickoffs] = useState(null)
    const [message, setMessage] = useState("")
    
    useEffect(() => {
        axios.get('http://localhost:5000/api/groups/all').then(res => {
            setGroups(res.data)
        }).catch(err => {
            setMessage(err.message)
        });
        axios.get('http://localhost:5000/api/kickoff/').then(res => {
            setKickoffs(res.data)
        }).catch(err => {
            setMessage(err.message)
        });
    }, [])

    const groupFunction = () => {
        groups.forEach(group => {
            {group.map((val, key) => {
                const photo = val.photo
                return (
                    <div key={key} style={{backgroundImage: photo}}>
                        <h1>{val.name}</h1>
                    </div>     
                )
            })}
        })
    };

    const kickoffFunction = () => {
        kickoffs.forEach(kickoff => {
            {kickoff.map((val, key) => {
                const photo = val.photo
                return (
                    <div key={key} style={{backgroundImage: photo}}>
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