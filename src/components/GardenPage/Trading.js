import React, {useContext, useState, useEffect} from "react";
import {withRouter} from "react-router-dom";
import { Redirect } from 'react-router';
import { HashkingsAPI } from "../../service/HashkingsAPI";
import {StateContext} from "../../App";
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import GiftSeed from "../GiftSeed";

const useStyles = makeStyles(theme => ({
  root: {
    '& > svg': {
      margin: theme.spacing(2),
    },
  },
  flex: {
    flexGrow: 1,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#095938",
  },
  paperDarkBlue: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#154A4A",
  },
  paperDivider: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#949494",
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  font: {
    fontFamily: '"Jua", sans-serif',
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: { 500: '#00211B' }, // custom color in hex 
  },
});

export const Trading = () => {
    const {username} = useContext(StateContext);
    const classes = useStyles();
  
    const [dashboardStats, setDashboardStats] = useState({
      gardeners: 0,
      gardens: 0,
      availableSeeds: 0,
      activeGardens: 0,
      availableGardens: 0,
      activity: [],
      delegation: 0,
      leaderboard: []
    });
  
    const [user, setUser] = useState({
      availableSeeds: [],
      activeGardens: [],
      availableGardens: [],
      headBlockNum: undefined
    });
  
    const [gardens, setGardens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [setNoMoreHistory] = useState(false);
  
    const [headBlockNum, setHeadBlockNum] = useState(0);
  
    const hashkingsApi = new HashkingsAPI();
  
    useEffect(() => {
      if (username) {
        hashkingsApi.getUserGarden(username).then(garden => {
          const {headBlockNum, ...user} = garden;
          setUser(user);
          setHeadBlockNum(headBlockNum);
        });
      }
    }, [username]);
  
    useEffect(() => {
      hashkingsApi
        .getDashboardStats(username)
        .then(stats => {
          if (username) {
            setDashboardStats(stats);
          } else {
            setDashboardStats({
              ...dashboardStats,
              ...stats
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    }, [username]);
  
    useEffect(() => {
      if (username) {
        setLoading(true);
        hashkingsApi.getDGPO().then(dgpo => {
          const spv =
            parseFloat(dgpo.total_vesting_fund_steem.split(" ")[0]) /
            parseFloat(dgpo.total_vesting_shares.split(" ")[0]);
          Promise.all([
            hashkingsApi
              .getAccountHistory(spv, username, false)
              .then(
                ({
                  stop,
                  date
                }) => {
  
                  if (stop) {
                    setNoMoreHistory(true);
                  }
  
                  if (date) {
                  }
                }
              ),
            hashkingsApi.getUserGarden(username).then(garden => {
              setGardens(garden.activeGardens);
            })
          ]).then(() => setLoading(false));
        });
      }
    }, [username]);

if (username) {
      return (
        <div className={classes.flex}>
          <Grid container spacing={12}>
          <Grid item xs={12}>
            <Paper className={classes.paperDivider}></Paper>
          </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paperDarkBlue}>
                <ThemeProvider theme={theme}>
                <Typography gutterBottom variant="h5" component="h1">
                  <b><font color="DFB17B" className={classes.font}>Trading</font></b>
                  </Typography>
                  <Typography color="error" className={classes.font}>Important!  Users must have signed in to hashkings at least once to receive their seeds</Typography>
                  </ThemeProvider>
                  </Paper>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                <Paper className={classes.paperDarkBlue}>
                <GiftSeed />
                </Paper>
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>
              <Grid container spacing={12}>
      <Grid item xs={12}>
      <Paper className={classes.paperDivider}></Paper>
      </Grid>
      </Grid>
        </div>
        )


  } else {
    return (
    <Redirect to='/login'/>
    );
  }
};

export default withRouter(Trading);