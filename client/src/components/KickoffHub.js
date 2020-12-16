import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from '../styles/KickoffHub.css'

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
                    <div key={key} className={styles.boxes} style={{backgroundImage: photo}}>
                        <h1 className={styles.txt}>{val.name}</h1>
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
                    <div key={key} className={styles.boxes} style={{backgroundImage: photo}}>
                        <h1 className={styles.txt}>{val.title}</h1>
                    </div>
                )
            })}
        })
    }

  useEffect(() => {
    axios
      .get("groupserverurl")
      .then((res) => {
        setGroups(res.data);
      })
      .catch((err) => {
        setMessage(err.message);
      });
    axios
      .get("kickoffserverurl")
      .then((res) => {
        setKickoffs(res.data);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  }, []);

    return (
        <div className={styles.main_div}>  
            <h1>Kickoff Hub</h1>
            <div className={styles.grouping_div}>
                {groupFunction()}
            </div>
            <div className={styles.grouping_div}>
                {kickoffFunction()}
            </div>
          );
        });
      }
    });
  };

  return (
    <div>
      <div>{groupFunction}</div>
      <div>{kickoffFunction}</div>
    </div>
  );
}
