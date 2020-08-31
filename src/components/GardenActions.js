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
import {Line} from 'react-chartjs-2';
import DiamondCard from './Diamond.js';
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
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import DiamondTable from "./Diamondtable";
import DiamondTabInfo from "./DiamondTabInfo";
import {Doughnut} from 'react-chartjs-2';
import DepositTable from "./DepositTable";

const state = {
  labels: ['Diamond', 'Ruby', 'Saphire',
           'Onys', 'Obsidian'],
  datasets: [
    {
      label: 'NFT',
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
        '#6800B4'
      ],
      hoverBackgroundColor: [
      '#501800',
      '#4B5000',
      '#175000',
      '#003350',
      '#35014F'
      ],
      data: [10, 15, 25, 20, 30]
    }
  ]
}

const state2 = {
  labels: ['Apri', 'May', 'June',
           'July', 'August'],
  datasets: [
    {
      label: 'ETH',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [1, 2, 1.7, 1.9, 2, 2.8, 4]
    }
  ]
}

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
    backgroundColor: "#100d00",
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
    color: "#6d4f12"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  vr: {
    borderleft: `5px solid #000000`,
    height: 500,
  },
  background: {
    backgroundColor: "#100d00"
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-start',
    fontFamily: '"Orbitron", sans-serif',
    color: "#6d4f12",
    
  },
}));

const actions = [
  { icon: <AccountBalanceWalletIcon />, name: 'Connect Metamask' },
  { icon: <AccountBalanceWalletIcon />, name: 'Save' },
  { icon: <AccountBalanceWalletIcon />, name: 'Print' },
  { icon: <AccountBalanceWalletIcon />, name: 'Share' },
  { icon: <AccountBalanceWalletIcon />, name: 'Like' },
];

const theme = createMuiTheme({
  palette: {
    primary: { 500: '#00211B' }, // custom color in hex 
  },
});

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#000000",
    color: '#b69552',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export const GardenActions = () => {
    const {username} = useContext(StateContext);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);

    const handleVisibility = () => {
      setHidden((prevHidden) => !prevHidden);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-prevent-tab-${index}`,
      'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
  }

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
          <div>
          <Typography className={classes.title} variant="h3">
          <img src="https://i.imgur.com/BuBdO1Z.png" />  <b>Your Dashboard</b>
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
        <Doughnut
          data={state}
          options={{
            title:{
              display:false,
              text:'Asset Distribution',
              fontSize:20
            },
            legend:{
              display:true,
              position:'left'
            }
          }}
        />
        <br/>
      
        </Paper>
        <Paper className={classes.paperBrown}>
        <Line
          data={state2}
          options={{
            title:{
              display:true,
              text:'Portfolio Value (ETH)',
              fontSize:20,
              fontColor:"#6d4f12",
            },
            legend:{
              display:false,
              position:'right'
            }
          }}
        />
        <br/>
      
        </Paper>
          </Grid>
          <Grid item xs>
          <AppBar position="static" color='transparent'>
          <Typography className={classes.title} variant="h5" wrap>
            <b>Current Assets</b>
          </Typography>
          
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
          className={classes.background}
        >
          <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography className={classes.font}><b><u>Onyx</u></b></Typography>
                </React.Fragment>
              }
              placement="left"
              TransitionComponent={Zoom}
              >
          <Tab icon={<FarmingIcon />} aria-label="diamond" {...a11yProps(0)} />
          </HtmlTooltip>
          <Tab icon={<CraftingIcon />} aria-label="drawer" {...a11yProps(1)} />
          <Tab icon={<GiftIcon />} aria-label="chest" {...a11yProps(2)} />
        </Tabs>
      </AppBar>      
      <TabPanel value={value} index={0} className={classes.background}>
            <Grid container spacing={1}>
            <Grid item xs>
      
             
            <ThemeProvider theme={theme}>
              <DiamondCard />
                </ThemeProvider>
    
              </Grid>
              
              <Grid item xs>
              <Paper className={classes.paperBrown}>
            <ThemeProvider theme={theme}>
            <DiamondTabInfo />
                </ThemeProvider>
                </Paper>
              </Grid>
              </Grid>

              <Grid item xs>
            <Box boxShadow={4}>
              <Paper className={classes.paperBrown}>
            <ThemeProvider theme={theme}>
              <DiamondTable />
                </ThemeProvider>
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

export default withRouter(GardenActions);