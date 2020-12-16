import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import UserContext from "../context/UserContext";

export default function RoomChat() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  return (
    <div>
      <h1> Test Page</h1>
      <h3>After loging in, a user will be redirected here </h3>
      {userData.user && (
        <>
          <h4>{userData.user.username}</h4>
          <h4>{userData.user.firstName}</h4>
          <h4>{userData.user.lastName}</h4>
          <h4>{userData.user.icon}</h4>
        </>
      )}
      <button onClick={logout}> Logout</button>
    </div>
  );
}
