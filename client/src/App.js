import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RoomChat from "./components/RoomChat";
import NavBar from "./components/NavBar";
import Homepage from "./components/Homepage";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/room" component={RoomChat} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
