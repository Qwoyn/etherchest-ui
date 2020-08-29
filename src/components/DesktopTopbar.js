import React from 'react';
import Grid from '@material-ui/core/Grid';
import {AppInlineProfile} from "../AppInlineProfile";
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
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
      fontFamily: '"Jua", sans-serif',
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
                  <Typography color="error" className={classes.font}>Home</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
            <IconButton className="layout-menu-button" component={Link1} to="/home">
            <FarmIcon />
            </IconButton>
            </HtmlTooltip>
            </Grid>
            <Grid item xs={1}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}>Visit your Farm</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
            <IconButton className="layout-menu-button" component={Link1} to="/farm">
            <CareIcon />
            </IconButton>
            </HtmlTooltip>
            </Grid>

            <Grid item xs={1}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}>Market</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
            <IconButton className="layout-menu-button" component={Link1} to="/markets">
            <StoreIcon />
            </IconButton>
            </HtmlTooltip>
            </Grid>

            {/*<Grid item xs={1}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}>Starter Seeds</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
            <IconButton className="layout-menu-button" component={Link1} to="/market/seedbank">
            <SeedIcon />
            </IconButton>
            </HtmlTooltip>
            </Grid> */}

            <Grid item xs={1}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}>Trending Posts</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
            <IconButton className="layout-menu-button" component={Link1} to="/trending">
            <BlogIcon />
            </IconButton>
            </HtmlTooltip>
            </Grid> 

            <Grid item xs={1}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}>Learn to Play</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
            <IconButton className="layout-menu-button" component={Link1} to="/tutorial">
            <TutorialIcon />
            </IconButton>
            </HtmlTooltip>
            </Grid> 

            <Grid item xs={1}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}>Become a Patron</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
            <a href="https://www.patreon.com/hashkings" target="_default">    
            <IconButton className="layout-menu-button">
            <PatreonIcon />
            </IconButton>
            </a>
            </HtmlTooltip>
            </Grid> 

            <Grid item xs={1}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}>Dutch Passion Seeds</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
            <a href="https://www.dutch-passion.com?afmc=c5&utm_campaign=c5&utm_source=leaddyno&utm_medium=affiliate" target="_default">    
            <IconButton className="layout-menu-button">
            <FunditionIcon />
            </IconButton>
            </a>
            </HtmlTooltip>
            </Grid> 
            
            <Grid item xs={1}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}>What is STEEM?</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
            <a href="https://steemit.com/faq.html" target="_default">    
            <IconButton className="layout-menu-button">
            <SteemSVGIcon />
            </IconButton>
            </a>
            </HtmlTooltip>
            </Grid> 
            
            <Grid item xs={1}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}>FAQ</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
            <IconButton className="layout-menu-button" component={Link1} to="/faq">
            <InformationIcon />
            </IconButton>
            </HtmlTooltip>
            </Grid>
                        
        </Grid>
    </Grid>
    <Grid item xs={6}>
        <div className="layout-topbar-icons button">
            <AppInlineProfile />
        </div>
    </Grid>
</Grid>
</div> 
    );
}