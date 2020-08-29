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
import { GerminateIcon } from './Icons';
import PlantModal from "./PlantModal";
import { HashkingsAPI } from "../service/HashkingsAPI";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  font: {
    fontFamily: '"Jua", sans-serif',
  },
  fab: {
    margin: theme.spacing(1),
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
    fontFamily: '"Jua", sans-serif',
  },
  paperBlue: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#154A4A",
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
}));

export const PlantingTutorial = () => {
  const hashkingsApi = new HashkingsAPI();
  const {username} = useContext(StateContext);
  const classes = useStyles();
  
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

  const [plantSeedModal, setPlantSeedModal] = useState(false);
  const [user, setUser] = useState({
    availableSeeds: [],
    activeGardens: [],
    availableGardens: [],
    headBlockNum: undefined
  });

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

  const [gardens, setGardens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [setNoMoreHistory] = useState(false);

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
                      <Typography color="error" className={classes.font}><u>Planting</u></Typography>
                      <em><a href="/market/seedbank">{"Did you get seeds?"}</a></em> <b>{"plant some Crops!"}</b>
                    </React.Fragment>
                  }
                  placement="left"
                  TransitionComponent={Zoom}
                  >
                  <Fab
                    variant="contained" 
                    color="primary"
                    onClick={() => setPlantSeedModal(!plantSeedModal)}
                    className={classes.button}
                  ><GerminateIcon />
                  </Fab>
                  </HtmlTooltip>
                </ThemeProvider>
                  </Paper>
    </Grid>
    <Grid item xs={8}>
      <Paper className={classes.paper}>
      <Typography paragraph className={classes.font}>
        <font color="DFB17B">The next step is to plant your seed on your plot of land. 
        </font>
      </Typography>
      <Typography paragraph className={classes.font}>
        <font color="DFB17B">When you click the button you will see a popup. Please follow the directions.</font>
      </Typography>
      <Typography paragraph className={classes.font}>
        <font color="DFB17B">Original first round of seeds, purchased in the Hashkings Seed Bank or bought from other players. 
        These limited edition seeds cannot be grown and are limited in number. We call 
        them the Genesis Seeds because they are the first ones and give life to the beta seeds after harvest.</font>
      </Typography>
      <Typography paragraph className={classes.font}>
        <font color="red">Click next when you are finished!</font>
      </Typography>
      </Paper>    
  </Grid>
    </Grid>
    </Paper>
    <PlantModal
          isOpen={plantSeedModal}
          toggleModal={() => setPlantSeedModal(!plantSeedModal)}
          availableGardens={user.availableGardens}
          availableSeeds={user.availableSeeds}
          username={username}
        />
  </Paper>
  )
};
