import React from "react";
import {withRouter} from "react-router-dom";
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {StyleRoot} from 'radium';
import DepositTable from "./DepositTable";
import CurrentAssetsTab from "./CurrenAssetsTab";
import DashboardGraphs from "./DashboardGraphs";
import Button from '@material-ui/core/Button';
import TotalPortValue from './TotalPortValue';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  dialroot: {
    height: 200,
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  paperBrown: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#3f4f7c",
  },
  paperRed: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#260518",
  },
  font: {
    fontFamily: '"Orbitron", sans-serif',
    color: "#977630"
  },
  vr: {
    borderleft: `5px solid #000000`,
    height: 500,
  },
  background: {
    backgroundColor: "#3f4f7c",
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-start',
    fontFamily: '"Orbitron", sans-serif',
    color: "#977630",
  },
}));


export const Dashboard = () => {
    const classes = useStyles();
    
      return (
        <div className={classes.flex}>
          <StyleRoot>
            <div>
              <Typography className={classes.title} variant="h3">
              <img src="https://i.imgur.com/BuBdO1Z.png" />  
              <b>Your Dashboard</b>
              </Typography> 
              <hr/>
              <br/>
              <br/>
              <Grid container spacing={1}>
                <Grid item xs>
                  <Typography className={classes.title} variant="h5">
                  <b>Portfolio Distribution</b>
                  </Typography>
                  <hr/>

                  <Paper className={classes.paperBrown}>
                    <DashboardGraphs />
                    <TotalPortValue />
                  </Paper>
                </Grid>

                <Grid item xs={1}> </Grid>
          
                <CurrentAssetsTab />
              </Grid>
              <br/>
              <hr/>
              <br/> 
              <DepositTable />
            </div>
          </StyleRoot>
    </div>
    );
};

export default withRouter(Dashboard);