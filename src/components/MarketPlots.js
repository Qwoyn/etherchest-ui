import React, {useContext, useState, useEffect} from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import {HashkingsAPI} from "../service/HashkingsAPI";
import {StateContext} from "../App";
import Delegate from "./Delegate";
import BuyGarden from "./BuyGarden";
import { Redirect } from 'react-router';
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Box from '@material-ui/core/Box';
import { Parallax } from 'react-parallax';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#294A0B",
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
  card: {
    maxWidth:'auto',
    backgroundColor: "#154A4A",
  },
  media: {
    height: 140,
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
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export const MarketPlots = () => {
  const hashkingsApi = new HashkingsAPI();
  const classes = useStyles();
  const {username} = useContext(StateContext);
  const [delegation, setDelegation] = useState({used: 0, available: 0});
  const [landSupply, setLandSupply] = useState();
  const leaseBackground = "https://i.imgur.com/j2CGYh2.jpg";

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (username) {
      Promise.all([
        hashkingsApi.getUserDelegation(username),
        hashkingsApi.getStats()
      ])
        .then(([delegation, stats]) => {
          if (delegation && delegation.delegator) {
            setDelegation({
              used: delegation.used,
              available: delegation.availible
            });
          }
          setLandSupply(stats.supply.land);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [username]);

  const updateDelegation = newDelegation => {
    setDelegation(newDelegation);
  };

  if (!username) {
    return (
    <Redirect to='/login'/>
    );
  } else {
  return (
    <div>
      <br/>
    <Grid container spacing={1}>
      <Grid item xs>
      <HtmlTooltip
          title={
            <React.Fragment>
            <Typography color="error">
              <u>Plot Credits</u>
            </Typography>
              <em><a href="/market/seedbank">{"Use your plot credits to gain access to farm plots"}</a></em> <b>{"1 Plot Credit = 20 STEEM Power delegation"}</b>
            </React.Fragment>
          }
          placement="top"
          TransitionComponent={Zoom}
          >
             <Box boxShadow={12}>
      <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="https://i.imgur.com/ZohrL4N.png"
              title="Mexico"
            />
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="h5" component="h2" className={classes.font}>
                <font color="DFB17B">
                Delegate for Plot Credits
                </font>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}>To grow plants you will need to have plot credits. Each plot credit
              allows you to choose a plot below. You can see the number of plot credits you own and how many have been used. 
              To get more plot credits just delegate 20 STEEM Power for each Plot Credit!</font>
              </Typography>
              <br/>
              <Delegate
                  username={username}
                  delegation={delegation}
                  updateDelegation={updateDelegation}
                />
          </CardContent>
            <hr/>
        </Card>
        </Box>
      </HtmlTooltip>
    </Grid>
    </Grid>

    <br/>

    <Grid item xs alignItems="flex-end">
    <Box boxShadow={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/x1eOPYj.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Lease a plot</font>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <font color="DFB17B" className={classes.font}>Each plot requires a 0.5 STEEM Leasing Fee. Please choose your region below.</font>
          </Typography>
          <br/>
          {delegation.available > 0 && (
              <BuyGarden
                username={username}
                delegation={delegation}
                updateDelegation={updateDelegation}
                landSupply={landSupply}
              />
            )}
            {delegation.available === 0 && (
              <p>
                <font color="DFB17B" className={classes.font}>
                  <b>
                    All Fees Paid. Please delegate more Steem Power to lease a plot.
                  </b>
                </font>
              </p>
            )}
          {/*<BuySeed type="r" />*/}
        </CardContent>
      </Card>
      </Box>
    </Grid>
    <br/>
    </div>
  );
}
};

