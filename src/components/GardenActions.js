import React, {useContext, useState, useEffect} from "react";
import {withRouter} from "react-router-dom";
import { HashkingsAPI } from "../service/HashkingsAPI";
import {StateContext} from "../App";
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { slideInLeft } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import { fadeIn } from 'react-animations';
import { slideInRight } from 'react-animations';
import { WaterIcon, 
         GerminateIcon, 
         HarvestIcon, 
         OilIcon,
         CannagarIcon,
         PollinateIcon, 
         JointIcon, 
         FarmingIcon, 
         GiftIcon, 
         CraftingIcon, 
         CrystalIcon,
         DippedIcon, 
         BluntIcon } from './Icons';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

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
    fontFamily: '"Orbitron", sans-serif',
    color: "#DFB17B"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  vr: {
    borderleft: `5px solid #000000`,
    height: 500,
  },
  background: {
    backgroundColor: "#073232"
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-start',
    fontFamily: '"Orbitron", sans-serif',
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
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
    const [dashboardStats, setDashboardStats] = useState({
      gardeners: 0,
      gardens: 0,
      availableSeeds: 0,
      activeGardens: 0,
      availableGardens: 0,
      availableKief : 0,
      breederName: '',
      availableOil: 0,
      totalxps: 0,
      activity: [],
      delegation: 0,
      leaderboard: []
    });
  
    const [plantSeedModal, setPlantSeedModal] = useState(false);
    const [pollinateSeedModal, setPollinateSeedModal] = useState(false);
    const [waterModal, setWaterModal] = useState(false);
    const [craftOilModal, setCraftOilModal] = useState(false);
    const [craftKiefModal, setCraftKiefModal] = useState(false);
    const [craftJointModal, setCraftJointModal] = useState(false);
    const [craftBluntModal, setCraftBluntModal] = useState(false);
    const [harvestModal, setHarvestModal] = useState(false);
    const [user, setUser] = useState({
      availableSeeds: [],
      activeGardens: [],
      availablePollen: [],
      availableBuds: [],
      availableKief: [],
      availableOil: [],
      totalxps: [],
      availableDippedJoints: [],
      availableBlunts: [],
      availableEdibles: [],
      availableJoints: [],
      availableCannagars: [],
      availableBrownieMix: [],
      availablePapers: [],
      availableHempwraps: [],
      availableBluntwraps: [],
      availableVacovens: [],
      availableKiefbox: [],
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
          <div style={styles.slideInLeft2}>
          <Grid container spacing={1}>
          

          
          <AppBar position="static" color='transparent'>
          <Typography className={classes.title} variant="h5">
            Your Chest
          </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
          className={classes.background}
        >
          <Tab icon={<FarmingIcon />} aria-label="cubby" {...a11yProps(0)} />
          <Tab icon={<CraftingIcon />} aria-label="drawer" {...a11yProps(1)} />
          <Tab icon={<GiftIcon />} aria-label="chest" {...a11yProps(2)} />
        </Tabs>
      </AppBar>      
      <TabPanel value={value} index={0}>
            <Grid item xs={12}>
            <Box boxShadow={4}>
              <Paper className={classes.paperBrown}>
            <ThemeProvider theme={theme}>
            
              <Typography gutterBottom variant="h3" component="h3" className={classes.font}>
                gem
                </Typography>

                </ThemeProvider>
                <hr/>
                </Paper>
                </Box>
              </Grid>
              
              
                        </TabPanel>

                        <TabPanel value={value} index={1}>
                        <Grid item xs={12}>
            <Box boxShadow={4}>
              <Paper className={classes.paperBrown}>
            <ThemeProvider theme={theme}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}><u>Craft Items</u></Typography>
                  <b>{"This is where you create items with your buds!"}</b>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
              <Typography gutterBottom variant="h3" component="h3" className={classes.font}>
                Drawers
                </Typography>
                </HtmlTooltip>
                </ThemeProvider>
                <hr/>
                </Paper>
                </Box>
              </Grid>

             
              </TabPanel>

              <TabPanel value={value} index={2}>
                        <Grid item xs={12}>
                  <Box boxShadow={4}>
                  <Paper className={classes.paperBrown}>            
                    <ThemeProvider theme={theme}>
                    
              <Typography gutterBottom variant="h3" component="h3" className={classes.font}>
                Chests
                </Typography>
     
                        </ThemeProvider>
                        </Paper>
                        </Box>
                        </Grid>
                      </TabPanel>
                    
                      </Grid>
                      <br/>
                      
                      
                      </div>
                    </StyleRoot>
                    </div>
                    
                  );
};

export default withRouter(GardenActions);