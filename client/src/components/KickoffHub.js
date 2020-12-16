import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/KickoffHub.css'

export default function KickoffHub() {
  const [groups, setGroups] = useState([])
  const [kickoffs, setKickoffs] = useState([])
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

  // const groupFunction = () => {
  //     groups.map((group) => {
  //             return (
  //                 <div key={group._id} className={boxes} style={{backgroundImage: group.photo}}>
  //                     <h1 className={txt}>{group.name}</h1>
  //                 </div>     
  //             )
  //         })
  // };

  // const kickoffFunction = () => {
  //     kickoffs.map((kickoff) => {
  //             return (
  //                 <div key={kickoff._id} className={boxes} style={{backgroundImage: `url(${kickoff.photo})`}}>
  //                     <h1 className={txt}>{kickoff.title}</h1>
  //                 </div>
  //             )
  //         })
  // }


  return (
    <div className="main_div">
      <h1>Kickoff Hub</h1>
      <div className="grouping_div">
        {groups !== [] && groups.map((group) => {
          return (
            <div key={group._id} className="boxes" style={{ backgroundImage: `url(${group.photo})` }}>
              <h1 className="txt">{group.name}</h1>
            </div>
          )
        })}
      </div>
      <div className="grouping_div">
        {kickoffs !== [] && kickoffs.map((kickoff) => {
          return (
            <div key={kickoff._id} className="boxes" style={{ backgroundImage: `url(${kickoff.photo})` }}>
              <h1 className="txt">{kickoff.title}</h1>
            </div>
          )
        })}
      </div>
    </div>
  );
};
