
import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RoomChat from "./components/RoomChat";

function App() {
  return (
    <BrowserRouter>

      <Switch>
        <Route path="/room" component={RoomChat} />
      </Switch>
    </BrowserRouter>


  );
}

export default App;
