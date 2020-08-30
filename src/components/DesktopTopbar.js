import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import SeedIcon from './Icons';
import {  FarmTopbarIcon, 
          SteemSVGIcon, 
          BlogIcon, 
          CareIcon, 
          StoreIcon, 
          InformationIcon, 
          FarmIcon, 
          TutorialIcon,
          FunditionIcon,
          PatreonIcon, 
          BraveButton,
          LandIcon } from './Icons';
import Tooltip from '@material-ui/core/Tooltip';
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import { ExchangeIcon } from './Icons';

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
      backgroundColor: "#532C0C",
    },
    font: {
      fontFamily: '"Orbitron", sans-serif',
    },
    fontblack: {
      fontFamily: '"Orbitron", sans-serif',
      color: "#637397"
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
    },
  }))(Tooltip);

export default function DesktopTopbar(){
    const classes = useStyles();

    const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

    return (
<div className="layout-topbar clearfix">
<Grid container spacing={0}>
    <Grid item xs={6}>
        <Grid container spacing={0}>
            <Grid item xs={1}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography className={classes.font}>Exit Demo</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >   
            <IconButton className="layout-menu-button">
            <SteemSVGIcon />
            </IconButton>
            </HtmlTooltip>
            </Grid>

            <Grid item xs={1}>
            
            <IconButton className="layout-menu-button" disabled="true">
            <Typography className={classes.fontblack}>Etherchest.com</Typography>
            </IconButton>
            </Grid> 
        </Grid>
    </Grid>
</Grid>
</div> 
    );
}