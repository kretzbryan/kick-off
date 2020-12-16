import axios from 'axios';
// import store from '../store';
// import { LOGOUT } from '../actions/types'


const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// api.interceptors.response.use(
//     res => res,
//     err => {
//         if (err.response.status === 401) {
//             store.dispatch({ type: LOGOUT })
//         }
//     }
// )



export default api;

// This is an example of receiving data with the api utility

// 1. import api from this file

// 2. 
    // const clickThis = async (e) => {
    //     try {
    //          3. Define create a variable making the request to the database, the base URL is found on line 7 of this folder
    //         const res = await api.get('/kickoff');
    //          4. res.data is what is being sent to the front end via res.json
    //         console.log(res.data)
    //     } catch (err) {
            
    //     }
    // }