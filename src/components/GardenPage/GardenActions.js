import React, {useContext, useState, useEffect} from "react";
import {withRouter} from "react-router-dom";
import { HashkingsAPI } from "../../service/HashkingsAPI";
import {StateContext} from "../../App";
import PlantModal from "../PlantModal";
import PollinateModal from "../PollinateModal";
import WaterModal from "../WaterModal";
import CraftOilModal from "../OilModal"
import HarvestModal from "../HarvestModal";
import KiefModal from "../KiefModal";
import BluntModal from "../BluntModal";
import JointModal from "../JointModal";
import Inventory from "./Inventory.js";
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
         BluntIcon } from '../Icons';
import Box from '@material-ui/core/Box';
import SeedGifting from '../seeds/SeedGifting.js';
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
    fontFamily: '"Jua", sans-serif',
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
          <Grid item xs={5}>
          <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
          className={classes.background}
        >
          <Tab icon={<FarmingIcon />} aria-label="phone" {...a11yProps(0)} />
          <Tab icon={<CraftingIcon />} aria-label="favorite" {...a11yProps(1)} />
          <Tab icon={<GiftIcon />} aria-label="person" {...a11yProps(2)} />
        </Tabs>
      </AppBar>      
      <TabPanel value={value} index={0}>
            <Grid item xs={12}>
            <Box boxShadow={4}>
              <Paper className={classes.paperBrown}>
            <ThemeProvider theme={theme}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}><u>Plant, Water and Harvest </u></Typography>
                  <em><a href="/market/seedbank">{"This is where you perform your main tasks."}</a></em> <b>{"Don't forget to check the progress!"}</b>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
              <Typography gutterBottom variant="h3" component="h3" className={classes.font}>
                Farming
                </Typography>
                </HtmlTooltip>
                </ThemeProvider>
                <hr/>
                </Paper>
                </Box>
              </Grid>
              
              <Grid item xs={12}>
              <Box boxShadow={4}>
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
                </Box>
              </Grid>

              <Grid item xs={12}>
              <Box boxShadow={4}>
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
                  </Box>
                  </Grid>

                  <Grid item xs={12}>
              <Box boxShadow={4}>
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
                  onClick={() => setPollinateSeedModal(!pollinateSeedModal)}
                  className={classes.button}
                ><PollinateIcon />
                </Fab>
                </HtmlTooltip>
              </ThemeProvider>
                </Paper>
                </Box>
              </Grid>

                  <Grid item xs={12}>
                  <Box boxShadow={4}>
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
                          onClick={() => setHarvestModal(!harvestModal)}
                          className={classes.button}
                        ><HarvestIcon />
                        </Fab>
                        </HtmlTooltip>
                        </ThemeProvider>
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
                Crafting
                </Typography>
                </HtmlTooltip>
                </ThemeProvider>
                <hr/>
                </Paper>
                </Box>
              </Grid>
<br/>
              <Grid item xs={12}>
            <Box boxShadow={4}>
              <Paper className={classes.paperBrown}>
            <ThemeProvider theme={theme}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}><u>Kief and Oil </u></Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
              <Typography gutterBottom variant="h5" component="h5" className={classes.font}>
                Hashish
                </Typography>
                </HtmlTooltip>
                </ThemeProvider>
                <hr/>
                </Paper>
                </Box>
              </Grid>
        
              <Grid item xs={12}>
              <Box boxShadow={4}>
                <Paper className={classes.paperBrown}>
              <ThemeProvider theme={theme}>
                <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="error" className={classes.font}><u>Craft Kief</u></Typography>
                    <b>{"Use kief to craft moonrocks or dipped joints!"}</b>
                  </React.Fragment>
                }
                placement="left"
                TransitionComponent={Zoom}
                >
                <Fab
                  variant="contained" 
                  color="primary"
                  onClick={() => setCraftKiefModal(!craftKiefModal)}
                  className={classes.button}
                ><CrystalIcon />
                </Fab>
                </HtmlTooltip>
              </ThemeProvider>
                </Paper>
                </Box>
              </Grid>
              

              <Grid item xs={12}>
              <Box boxShadow={4}>
                <Paper className={classes.paperBrown}>
              <ThemeProvider theme={theme}>
                <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="error" className={classes.font}><u>Craft Oil</u></Typography>
                    <b>{"Use some Hashoil to create dipped joints or cannagars!"}</b>
                  </React.Fragment>
                }
                placement="left"
                TransitionComponent={Zoom}
                >
                <Fab
                  variant="contained" 
                  color="primary"
                  onClick={() => setCraftOilModal(!craftOilModal)}
                  className={classes.button}
                ><OilIcon />
                </Fab>
                </HtmlTooltip>
              </ThemeProvider>
                </Paper>
                </Box>
              </Grid>
<br/>
              <Grid item xs={12}>
            <Box boxShadow={4}>
              <Paper className={classes.paperBrown}>
            <ThemeProvider theme={theme}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}><u>Smoke these with your friends </u></Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
              <Typography gutterBottom variant="h5" component="h5" className={classes.font}>
                Consumables
                </Typography>
                </HtmlTooltip>
                </ThemeProvider>
                <hr/>
                </Paper>
                </Box>
              </Grid>

              <Grid item xs={12}>
              <Box boxShadow={4}>
                <Paper className={classes.paperBrown}>
              <ThemeProvider theme={theme}>
                <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="error" className={classes.font}><u>Roll a Joint</u></Typography>
                    <b>{"Roll a Joint and smoke it with your friends to gain XP"}</b>
                  </React.Fragment>
                }
                placement="left"
                TransitionComponent={Zoom}
                >
                <Fab
                  variant="contained" 
                  color="primary"
                  onClick={() => setCraftJointModal(!craftJointModal)}
                  className={classes.button}
                ><JointIcon />
                </Fab>
                </HtmlTooltip>
              </ThemeProvider>
                </Paper>
                </Box>
              </Grid>

              <Grid item xs={12}>
              <Box boxShadow={4}>
                <Paper className={classes.paperBrown}>
              <ThemeProvider theme={theme}>
                <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="error" className={classes.font}><u>Roll a Blunt</u></Typography>
                    <b>{"Roll a Blunt and smoke it with your friends to gain XP"}</b>
                    </React.Fragment>
                }
                placement="left"
                TransitionComponent={Zoom}
                >
                <Fab
                  variant="contained" 
                  color="primary"
                  onClick={() => setCraftBluntModal(!craftBluntModal)}
                  className={classes.button}
                ><BluntIcon />
                </Fab>
                </HtmlTooltip>
              </ThemeProvider>
                </Paper>
                </Box>
              </Grid>

              <Grid item xs={12}>
              <Box boxShadow={4}>
                <Paper className={classes.paperBrown}>
              <ThemeProvider theme={theme}>
                <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="error" className={classes.font}><u>Craft a Dipped Joint<font color="red"> (Coming Soon!!)</font></u></Typography>
                    <b>{"Roll a Dipped Joint with kief, bud and oil and smoke it with your friends to gain XP"}</b>
                  </React.Fragment>
                }
                placement="left"
                TransitionComponent={Zoom}
                >
                <Fab
                  variant="contained" 
                  color="primary"
                  //onClick={() => setPollinateSeedModal(!pollinateSeedModal)}
                  className={classes.button}
                ><DippedIcon />
                </Fab>
                </HtmlTooltip>
              </ThemeProvider>
                </Paper>
                </Box>
              </Grid>

              <Grid item xs={12}>
              <Box boxShadow={4}>
                <Paper className={classes.paperBrown}>
              <ThemeProvider theme={theme}>
                <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="error" className={classes.font}><u>Craft a fat Cannagar</u> <font color="red"><u>(Coming Soon!!)</u></font></Typography>
                    <b>{"Roll a Cannagar with kief, bud and oil and smoke it with your friends to gain XP"}</b>
                  </React.Fragment>
                }
                placement="left"
                TransitionComponent={Zoom}
                >
                <Fab
                  variant="contained" 
                  color="primary"
                  //onClick={() => setPollinateSeedModal(!pollinateSeedModal)}
                  className={classes.button}
                ><CannagarIcon />
                </Fab>
                </HtmlTooltip>
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
                    <SeedGifting />
                        </ThemeProvider>
                        </Paper>
                        </Box>
                        </Grid>
                      </TabPanel>
                      </Grid>
                      <Grid item xs>
                          <div classesName={classes.vr}>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <Inventory user={user} />
                        </Grid>
                      </Grid>
                      <br/>
                      <PlantModal
                        isOpen={plantSeedModal}
                        toggleModal={() => setPlantSeedModal(!plantSeedModal)}
                        availableGardens={user.availableGardens}
                        availableSeeds={user.availableSeeds}
                        username={username}
                      />
                      <PollinateModal
                        isOpen={pollinateSeedModal}
                        toggleModal={() => setPollinateSeedModal(!pollinateSeedModal)}
                        activeGardens={user.activeGardens}
                        availablePollen={user.availablePollen}
                        username={username}
                      />
                      <WaterModal
                        isOpen={waterModal}
                        toggleModal={() => setWaterModal(!waterModal)}
                        activeGardens={user.activeGardens}
                        username={username}
                        headBlockNum={headBlockNum}
                      />
                      <CraftOilModal
                        isOpen={craftOilModal}
                        toggleModal={() => setCraftOilModal(!craftOilModal)}
                        availableBuds={user.availableBuds}
                        availableVacovens={user.availableVacovens}
                        username={username}
                        headBlockNum={headBlockNum}
                        totalxps={user.totalxps}
                      />
                      <KiefModal
                        isOpen={craftKiefModal}
                        toggleModal={() => setCraftKiefModal(!craftKiefModal)}
                        availableBuds={user.availableBuds}
                        availableKiefbox={user.availableKiefbox}
                        username={username}
                        totalxps={user.totalxps}
                        headBlockNum={headBlockNum}
                      />
                      <JointModal
                        isOpen={craftJointModal}
                        toggleModal={() => setCraftJointModal(!craftJointModal)}
                        availableBuds={user.availableBuds}
                        availablePapers={user.availablePapers}
                        username={username}
                        totalxps={user.totalxps}
                        headBlockNum={headBlockNum}
                      />
                      <BluntModal
                        isOpen={craftBluntModal}
                        toggleModal={() => setCraftBluntModal(!craftBluntModal)}
                        availableBuds={user.availableBuds}
                        availableBluntwraps={user.availableBluntwraps}
                        username={username}
                        totalxps={user.totalxps}
                        headBlockNum={headBlockNum}
                      />
                      
                      <HarvestModal
                        isOpen={harvestModal}
                        toggleModal={() => setHarvestModal(!harvestModal)}
                        activeGardens={user.activeGardens}
                        username={username}
                        headBlockNum={headBlockNum}
                      />
                      </div>
                    </StyleRoot>
                    </div>
                    
                  );
};

export default withRouter(GardenActions);