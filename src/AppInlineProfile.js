import React, {useState, useContext, useEffect} from "react";
import { StateContext } from "./App";
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
//import FaceIcon from '@material-ui/icons/Face';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import SpeedDialBar from "./components/SpeedDialBar";
import Grid from '@material-ui/core/Grid';
import MetaMaskLoginButton from 'react-metamask-login-button';

const useStyles = makeStyles(theme => ({
font: {
  fontFamily: '"Orbiton", sans-serif',
},
paper: {
  position: 'absolute',
  width: 'auto',
  maxHeight: 'auto',
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
},
}));

export const AppInlineProfile = () => {
  const classes = useStyles();

    return (
      <div className="profile">
        <Grid containr spacing={1}>
          <Grid xs>
        <Tooltip title="The Dashboard will go live when Mainnet launches" placement="left">
        <MetaMaskLoginButton />
      </Tooltip>
      </Grid>
      <Grid xs>
        <Tooltip title="The Dashboard will go live when Mainnet launches" placement="left">
      <Chip
        color="secondary"
        label= "Testnet Demo"
        className={classes.font}
      />
      </Tooltip>
      </Grid>
      <Grid xs>
      <SpeedDialBar />
      </Grid>
      </Grid>
      <br/>
    </div>
    );
};
