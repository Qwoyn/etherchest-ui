import React, {useEffect, useContext} from "react";
import {withRouter} from "react-router-dom";
import {StateContext} from "../App";

const SCCallback = ({history}) => {
  const urlParams = new URLSearchParams(window.location.search);

  const {steemConnectAPI, login} = useContext(StateContext);

  useEffect(() => {
    if (urlParams.has("access_token")) {
      const accessToken = urlParams.get("access_token");

      steemConnectAPI.setAccessToken(accessToken);

      steemConnectAPI
        .me()
        .then(res => {
          login(res.name);
          localStorage.setItem("sc_token", accessToken);
          history.push("/farm");
        })
        .catch(e => {
          console.log(e);
          history.push("/login");
        });
    } else {
      history.push("/login");
    }
  }, []);

  return <h1 className="logging-in-text">Logging in</h1>;
};

export default withRouter(SCCallback);
