import React, {useContext, useState, useEffect} from "react";
import {withRouter} from "react-router-dom";
import { Redirect } from 'react-router';
import { HashkingsAPI, seedNames } from "../../service/HashkingsAPI";
import {StateContext} from "../../App";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { slideInRight } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import Box from '@material-ui/core/Box';
 
const styles = {
  slideInRight: {
    animation: 'x 1s',
    animationName: Radium.keyframes(slideInRight, 'slideInRight')
  }
}

const useStyles = makeStyles(theme => ({
  flex: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#000E0E",
  },
  font: {
    fontFamily: '"Jua", sans-serif',
  },
  root: {
    width: '100%',
    backgroundColor: '#DFB17B',
  },
  table: {
    backgroundColor: "#4A8686",
  },
  expansion: {
    backgroundColor: "#154A4A",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const marks = [
  {
    value: 25,
    label: 'Seedling',
  },
  {
    value: 28.57,
    label: '',
  },
  {
    value: 32.14,
    label: '',
  },
  {
    value: 35.71,
    label: '',
  },
  {
    value: 39.28,
    label: '',
  },
  {
    value: 42.85,
    label: '',
  },
  {
    value: 46.42,
    label: '',
  },
  {
    value: 50,
    label: 'Veg',
  },
  {
    value: 54,
    label: '',
  },
  {
    value: 57,
    label: '',
  },
  {
    value: 60,
    label: '',
  },
  {
    value: 63,
    label: '',
  },
  {
    value: 66,
    label: '',
  },
  {
    value: 69,
    label: '',
  },
  {
    value: 72,
    label: '',
  },
  {
    value: 75,
    label: 'Flower',
  },
  {
    value: 78,
    label: '',
  },
  {
    value: 81,
    label: '',
  },
  {
    value: 84,
    label: '',
  },
  {
    value: 89,
    label: '',
  },
  {
    value: 92,
    label: '',
  },
  {
    value: 95,
    label: '',
  },
  {
    value: 98,
    label: '',
  },
  {
    value: 100,
    label: 'Harvest',
  },
];

function valuetext(value) {
  return `${value}`;
}

function valueLabelFormat(value) {
  return marks.findIndex(mark => mark.value === value) + 1;
}

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

export const HashkingsTemplate = () => {
    const {username} = useContext(StateContext);
    const classes = useStyles();

    const [dashboardStats, setDashboardStats] = useState({
      gardeners: 0,
      gardens: 0,
      availableSeeds: 0,
      availablePollen: 0,
      availableBuds: 0,
      activeGardens: 0,
      availableGardens: 0,
      activity: [],
      delegation: 0,
      leaderboard: []
    });
  
 
    const [gardens, setGardens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [setNoMoreHistory] = useState(false);
  
    const hashkingsApi = new HashkingsAPI();
  
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
  
                  /*if (stop) {
                    setNoMoreHistory(true);
                  }
  
                  if (date) {
                  }*/
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
      <div className={classes.flex}>
      <StyleRoot>
      <div style={styles.slideInRight}>
      <Box boxShadow={4}>
      <Paper className={classes.paper}>
           <ThemeProvider theme={theme}>
                <Typography gutterBottom variant="h5" component="h5">
            <b><font color="DFB17B" className={classes.font}>Grow Journal</font></b>
          </Typography>
                  </ThemeProvider>
                  <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="error" className={classes.font}><u>Plot Progress</u></Typography>
                      <em><a href="/market/seedbank">{"Find out how far along your plants are."}</a></em> <b>{"Is it time to Harvest?"}</b>
                    </React.Fragment>
                  }
                  placement="left-start"
                  TransitionComponent={Zoom}
                  >
           <ExpansionPanel className={classes.expansion}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header" 
        >
        <Typography className={classes.heading}><font color="DFB17B" className={classes.font}>Progress</font></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansion}>
        <DataTable
                value={gardens}
                loading={loading}
                className={classes.font}
                responsive={true}
                emptyMessage="Please plant some seeds or visit our market to get more plots"                
              >
                <Column field="id" header="Plot #" className={classes.font} sortable={false} style={{width:'20%', backgroundColor:"#DFB17B", color:'#000000'}} />
                <Column
                  field="strain"
                  header="Strain"
                  sortable={false}
                  body={({ strain }) => seedNames[strain]}
                  style={{width:'20%', backgroundColor:"#DFB17B", color:'#000000'}}
                  className={classes.font}
                />
                <Column
                  field="stage"
                  header="Growth Stage"
                  sortable={false}
                  style={{backgroundColor:"#DFB17B", color:'#000000'}}
                  className={classes.font}
                  body={({ stage }) => {
                    return (
                      <div className={classes.root}>
                        <Slider
                          value={stage / 3 * 85}
                          valueLabelFormat={valueLabelFormat}
                          getAriaValueText={valuetext}
                          aria-labelledby="discrete-slider-restrict"
                          step={3.57}
                          valueLabelDisplay="auto"
                          marks={marks}
                          disabled={true}
                          color='primary'
                          max={110}
                          min={25}
                          style={{color:'#000000'}}
                        />
                    </div>
                    );
                  }}
                />
              </DataTable>
        </ExpansionPanelDetails>
        <Typography className={classes.font}><font color="red">
        Please allow 24 hours for your harvested plots to reset</font></Typography>
        <br/>
      </ExpansionPanel>
      </HtmlTooltip>
      <br/>

      
      {/*
      
      This is not properly keeping track and needs to have harvesting added as well
      
      <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="error" className={classes.font}><u>Recent Waterings and Plantings</u></Typography>
                      <em><a href="/market/seedbank">{"Keep track of when you last watered!"}</a></em> <b>{"You need to water every plot once every 24 hours.  Don't overwater!"}</b>
                    </React.Fragment>
                  }
                  placement="left"
                  TransitionComponent={Zoom}
                  >
          <ExpansionPanel className={classes.expansion}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}><font color="DFB17B" className={classes.font}>Recent Activity</font></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansion}>
        <Paper className={classes.rootAgain}>
      <Table >
        <TableHead>
          <TableRow style={{backgroundColor:"#DFB17B"}}>
            <TableCell className={classes.font}>Action</TableCell>
            <TableCell align="right" className={classes.font}>Region</TableCell>
            <TableCell align="right" className={classes.font}>Time</TableCell>
            <TableCell align="right" className={classes.font}>Plot ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {dashboardStats.activity.map(action => (
            <TableRow key={action.block} style={{backgroundColor:"#DFB17B"}}>
              <TableCell component="th" scope="row" className={classes.font}>
              {action.type.charAt(0).toUpperCase() +
                        action.type.slice(1)}
              </TableCell>
              <TableCell align="right" className={classes.font}>{seedNames[action.strain]}</TableCell>
              <TableCell align="right" className={classes.font}>{action.when}</TableCell>
              <TableCell align="right" className={classes.font}>{action.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
        </ExpansionPanelDetails>
      </ExpansionPanel>
              </HtmlTooltip>*/}
      </Paper>
      </Box>
      </div>
      </StyleRoot>
      </div>
    </div>
      )

  } else {
    return (
    <Redirect to='/login'/>
    );
  }
};

export default withRouter(HashkingsTemplate);