import React, {useContext, useState, useEffect} from "react";
import {withRouter} from "react-router-dom";
import { HashkingsAPI } from "../service/HashkingsAPI";
import {StateContext} from "../App";
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { slideInLeft } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import { fadeIn } from 'react-animations';
import { slideInRight } from 'react-animations';
import { WaterIcon, GerminateIcon, HarvestIcon, PollinateIcon } from './Icons';
import Box from '@material-ui/core/Box';

const styles = {
  slideInRight: {
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInRight, 'slideInRight')
  },
  slideInLeft: {
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInLeft, 'slideInLeft')
  },
  slideInLeft1: {
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInLeft, 'slideInLeft1')
  },
  fadeIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  },
  slideInLeft2: {
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInLeft, 'slideInLeft2')
  }
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  paperBrown: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#000E0E",
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
    fontFamily: '"Jua", sans-serif',
    color: "#DFB17B"
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

export const GardenActions = () => {
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
  
    const [plantSeedModal, setPlantSeedModal] = useState(false);
    const [pollinateSeedModal, setPollinateSeedModal] = useState(false);
    const [waterModal, setWaterModal] = useState(false);
    const [harvestModal, setHarvestModal] = useState(false);
    const [user, setUser] = useState({
      availableSeeds: [],
      activeGardens: [],
      availablePollen: [],
      availableBuds: [],
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
  
                 /* if (stop) {
                    setNoMoreHistory(true);
                  }*/
  
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

      return (
        <div className={classes.flex}>
          <StyleRoot>
      <div>
      <Typography color="error" className={classes.font}><u>Badges</u></Typography>
      </div>
          <Grid container spacing={1}>
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
                  className={classes.button}
                ><GerminateIcon />
                </Fab>
                </HtmlTooltip>
              </ThemeProvider>
                </Paper>
              </Grid>

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
                  className={classes.button}
                ><GerminateIcon />
                </Fab>
                </HtmlTooltip>
              </ThemeProvider>
                </Paper>
              </Grid>

              <Grid item >
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
                    className={classes.button}
                  ><WaterIcon />
                  </Fab>
                  </HtmlTooltip>
                  </ThemeProvider>
                  </Paper>
                  </Grid>
                  
                  <Grid item>
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
                    className={classes.button}
                  ><WaterIcon />
                  </Fab>
                  </HtmlTooltip>
                  </ThemeProvider>
                  </Paper>
                  </Grid>

                  <Grid item xs>
                <Paper className={classes.paperBrown}>
              <ThemeProvider theme={theme}>
                <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="error" className={classes.font}><u>Pollinate</u></Typography>
                    <em><a href="/market/seedbank">{"Breed your own Hybrid?"}</a></em> <b>{"Use some pollen to breed!"}</b>
                  </React.Fragment>
                }
                placement="left"
                TransitionComponent={Zoom}
                >
                <Fab
                  variant="contained" 
                  color="primary"
                  className={classes.button}
                ><PollinateIcon />
                </Fab>
                </HtmlTooltip>
              </ThemeProvider>
                </Paper>
              </Grid>

                  <Grid item xs>
                  <Paper className={classes.paperBrown}>            
                    <ThemeProvider theme={theme}>
                    <HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography color="error" className={classes.font}><u>Harvest</u></Typography>
                            <em><a href="/market/seedbank">{"Are those buds nice and ripe?"}</a></em> <b>{"Harvest when they are ready."}</b>
                          </React.Fragment>
                        }
                        placement="top"
                        TransitionComponent={Zoom}
                        >
                        <Fab
                          variant="contained" 
                          color="primary"
                          
                          className={classes.button}
                        ><HarvestIcon />
                        </Fab>
                        </HtmlTooltip>
                        </ThemeProvider>
                        </Paper>
                      
                        </Grid>
                      </Grid>
                   
                    </StyleRoot>
                    </div>
                    
                  );
};

export default withRouter(GardenActions);