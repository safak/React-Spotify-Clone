import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import Login from "./pages/login/Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Homepage from "./pages/homepage/Homepage";
import { Context } from "./context/Context";

const spotify = new SpotifyWebApi();

function App() {
  const { user, token, dispatch } = useContext(Context);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        payload: _token,
      });

      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          payload: user,
        });
      });
    }
  }, []);

  console.log(token);

  return <div className="App">{token ? <Homepage /> : <Login />}</div>;
}

export default App;
