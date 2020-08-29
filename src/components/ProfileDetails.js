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
import TableContainer from '@material-ui/core/TableContainer';
import SeedsTable from './SeedsTable.js';
import FriendsTable from './FriendsTable';
import BadgeTable from './BadgeTable';

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

export const ProfileDetails = ({user}) => {
    const classes = useStyles();

      return (
        <div className={classes.flex}>
          <StyleRoot>
          <Grid container spacing={1}>
          <Grid item xs>

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
                <SeedsTable />
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
                  <BadgeTable />
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
                <FriendsTable />
                </HtmlTooltip>
              </ThemeProvider>
                </Paper>
                </Box>
              </Grid>
              </Grid>
              </Grid>
              <br/>
            </StyleRoot>
          </div>
                
                  );
};

export default withRouter(ProfileDetails);