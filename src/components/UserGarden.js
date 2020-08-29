import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import Inventory from "./GardenPage/Inventory";
import {HashkingsAPI} from "../service/HashkingsAPI";

function UserGarden({
  match: {
    params: {username}
  }
}) {
  const [user, setUser] = useState({
    availableSeeds: [],
    activeGardens: [],
    availableGardens: [],
    userExists: undefined
  });

  const hashkingsAPI = new HashkingsAPI();

  useEffect(() => {
    if (username) {
      hashkingsAPI.userExists(username).then(exists => {
        if (exists) {
          hashkingsAPI.getUserGarden(username).then(garden => {
            setUser({...garden, userExists: true});
          });
        } else {
          setUser({...user, userExists: false});
        }
      });
    }
  }, [username]);

  return (
    <div className="card-blank">
      <div className="p-fluid">
        <div className="p-col-12">
          <h1>
            <b>
              <u>{username}'s Inventory</u>
            </b>
          </h1>
        </div>
      </div>
      <div className="p-col-12">
        <div className="card-weedLeft card-w-title">
          {user.userExists === false ? (
            <p>Sorry, {username} doesn't play yet. Please login</p>
          ) : (
            <Inventory user={user} />
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(UserGarden);
