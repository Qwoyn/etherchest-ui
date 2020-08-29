import React, { useContext, useState, useEffect } from "react";
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import {StateContext} from "../App";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import { WaterIcon } from './Icons';
import WaterModal from "./WaterModal";
import { HashkingsAPI, seedNames } from "../service/HashkingsAPI";

export const WateringTutorial = () => {
  const {username} = useContext(StateContext);
  const hashkingsApi = new HashkingsAPI();
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

  const [loading, setLoading] = useState(false);
  const [setNoMoreHistory] = useState(false);  
  const [gardens, setGardens] = useState([]);

  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
    root: {
      '& > svg': {
        margin: theme.spacing(2),
      },
    },
    rootAgain: {
      width: '100%',
    },
    font: {
      fontFamily: '"Jua", sans-serif',
    },
    iconHover: {
      '&:hover': {
        color: "red[800]",
      },
    },
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
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
      textAlign: 'left',
      color: theme.palette.text.secondary,
      whiteSpace: 'wrap',
      marginBottom: theme.spacing(1),
      backgroundColor: "#294A0B",
    },
    paperBlue: {
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      whiteSpace: 'wrap',
      marginBottom: theme.spacing(1),
      backgroundColor: "#154A4A",
    },
    paperExtended: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
      backgroundColor: "#532C0C",
    },
    paperBlack: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
      backgroundColor: "#154A4A"
    },
    paperBlacky: {
      padding: theme.spacing(1),
      backgroundColor: "#000000",
    },
    paperBrown: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
      backgroundColor: "#532C0C",
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
    card: {
      maxWidth: 345,
      backgroundColor: "#000000",
    },
    media: {
      height: 140,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
  
  const theme = createMuiTheme({
    palette: {
      primary: { 500: '#00211B' }, // custom color in hex 
    },
  });
  
  const HtmlTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: "#000000",
      color: '#DFB17B',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

  const classes = useStyles();
  const [waterModal, setWaterModal] = useState(false);
  const [user, setUser] = useState({
    availableSeeds: [],
    activeGardens: [],
    availableGardens: [],
    headBlockNum: undefined
  });
  const [headBlockNum, setHeadBlockNum] = useState(0);

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

  return(
    <Paper className={classes.paperBlacky}>
    <Paper className={classes.paperBlue}>
    <Grid container spacing={3}>
      <Grid item xs>
      <Paper className={classes.paperBrown}>
                <ThemeProvider theme={theme}>
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="error" className={classes.font}><u>Water</u></Typography>
                      <em><a href="/market/seedbank">{"Your Plants might be thirsty!"}</a></em> <b>{"Give them some water."}</b>
                    </React.Fragment>
                  }
                  placement="right"
                  TransitionComponent={Zoom}
                  >
                  <Fab
                    variant="contained" 
                    color="primary"
                    onClick={() => setWaterModal(!waterModal)}
                    className={classes.button}
                  ><WaterIcon />
                  </Fab>
                  </HtmlTooltip>
                  </ThemeProvider>
                  </Paper>
    </Grid>
    <Grid item xs={8}>
      <Paper className={classes.paper}>
      <Typography paragraph>
        <font color="DFB17B" className={classes.font}>Go ahead and water your plant now.  Click the button and follow the directions in the popup and verify the transaction.
        </font>
      </Typography>
      <Typography paragraph className={classes.font}>
        <font color="DFB17B">This step is very important.  Once you water your plant you will want to come back every 24 hours 
        for the next 8 weeks to receive your rewards.  Once the 8 weeks is up you can Harvest and start the process over!</font>
      </Typography>
      <Typography paragraph className={classes.font}>
        <font color="red">Click next when you are finished!</font>
      </Typography>
      </Paper>    
  </Grid>
    </Grid>
    </Paper>
    <WaterModal
          isOpen={waterModal}
          toggleModal={() => setWaterModal(!waterModal)}
          activeGardens={user.activeGardens}
          username={username}
          headBlockNum={headBlockNum}
        />
  </Paper>
  )
};
