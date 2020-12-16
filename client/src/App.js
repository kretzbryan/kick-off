
import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RoomChat from "./components/RoomChat";
import NavBar from "./components/NavBar"
import Homepage from "./components/Homepage";
import axios from "axios";


////importing the user context
import UserContext from "./context/UserContext"; //can be set up like a component

function App() {

  //this variable will be used by usercontext.provider
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  const checkLogin = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    }
    // console.log(token);

    //START OF FIRST AXIOS CALL **********
    const tokenResponse = await axios.post("http://localhost:5000/user/isTokenValid", null,
      {
        headers: { "x-auth-token": token }
      })
    //END OF FIRST AXIOS CALL**********

    // console.log(tokenResponse.data);
    if (tokenResponse.data) {
      ///SECOND AXIOS CALL ******
      const userResponse = await axios.get("http://localhost:5000/user/info",
        {
          headers: {
            "x-auth-token": token,
          }
        });
      //END OF FIRST AXIOS CALL**********
      // console.log(res2);
      setUserData({
        token,
        user: userResponse.data
      })
      console.log(userResponse);
    }
  }



  useEffect(() => {
    checkLogin();
  }, []);


  return (
    <BrowserRouter>
      {/* anything inside UserContext.provider component will have access to the value (userData)
          THIS will be used in the log in and register to create/update token*/}
      <UserContext.Provider value={{ userData, setUserData }}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/room" component={RoomChat} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
