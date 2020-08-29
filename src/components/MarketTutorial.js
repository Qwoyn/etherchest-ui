import React, {useContext, useState, useEffect} from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import {HashkingsAPI} from "../service/HashkingsAPI";
import {StateContext} from "../App";
import Delegate from "./Delegate";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  font : {
    fontFamily: '"Jua", sans-serif',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  button: {
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
  },
  paperBlue: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#154A4A",
  },
  paperExtended: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    backgroundColor: "#000000",
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  card: {
    maxWidth: 345,
    backgroundColor: "#000000",
  },
}));

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
  const classes = useStyles();
  const {username} = useContext(StateContext);
  const [delegation, setDelegation] = useState({used: 0, available: 0});
  const [landSupply, setLandSupply] = useState();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const hashkingsApi = new HashkingsAPI();

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

  return (
    <Paper className={classes.paperExtended}> 
    <Paper className={classes.paperBlue}> 
      <Grid container spacing={1}>
        <Grid item xs={4}>
        <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="error" className={classes.font}><u>Delegate for a plot</u></Typography>
                      <em><a href="/market/seedbank">{"Get your farm plots here"}</a></em> <b>{"Each Plot requires a 20 STEEM Power delegation"}</b>
                    </React.Fragment>
                  }
                  placement="right"
                  TransitionComponent={Zoom}
                  >
    <Card className={classes.card}>
    <CardHeader />
    <CardMedia
      className={classes.media}
      image="https://i.imgur.com/ZohrL4N.png"
      title="Mexico"
    />
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p" className={classes.font}><font color="DFB17B">
      Plot Delegation</font>
      </Typography>
    </CardContent>
    <hr/>
    <CardActions disableSpacing>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon 
        color="error"
        />
      </IconButton>
    </CardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
      <Divider variant="middle" />
      <br/>
        <Delegate
              username={username}
              delegation={delegation}
              updateDelegation={updateDelegation}
            />
      <Divider variant="middle" />
      </CardContent>
    </Collapse>
  </Card>
  </HtmlTooltip>
  </Grid>
  <Grid item xs={8}>
      <Paper className={classes.paper}>
      <Typography paragraph className={classes.font}>
        <font color="DFB17B">Here is where you get yourself some land to grow on.  Each time you
        would like to get a plot you will need to delegate 20 STEEM Power.  Learn more about delegation <a href="https://steempeak.com/steemit/@katerinaramm/what-is-steem-power-delegation">here</a>
        </font>
      </Typography>
      <Typography paragraph className={classes.font}>
        <font color="DFB17B">Please expand the Delegation Card and choose the number of plots you would like click Delegate and verify the transaction.</font>
      </Typography>
      <Typography paragraph>
        <font color="red" className={classes.font}>Click next when you are finished!</font>
      </Typography>
      </Paper>    
  </Grid>
  </Grid>
  </Paper>
  </Paper>
  );
};
