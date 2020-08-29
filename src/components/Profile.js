import React, { useState, useContext, StateContext, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProfileDetails from './ProfileDetails.js';
import { HashkingsAPI } from '../service/HashkingsAPI';
 
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 500
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    height: 100,
    width: 100,
    marginLeft: '15px',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    height: 'auto',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function Profile() {
  const classes = useStyles();
  const theme = useTheme();
  const {username} = useState();
  const [headBlockNum, setHeadBlockNum] = useState(0);
  const hashkingsApi = new HashkingsAPI();

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
    breederName: [],
    headBlockNum: undefined
  });

  useEffect(() => {
    if (username) {
      hashkingsApi.getUserGarden(username).then(garden => {
        const {headBlockNum, ...user} = garden;
        setUser(user);
        setHeadBlockNum(headBlockNum);
      });
    }
  }, [username]);


  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <Grid xs={6}>
      <CardMedia
            className={classes.cover}
            image="https://i.imgur.com/ymrzJc9.png"
            title="Canna Curate"
          />
        <CardContent className={classes.content}>
          <Typography component="h4" variant="h4">
            {user.breederName}
          </Typography>
          <br/>
          <Typography variant="subtitle1">
            Northwest Cannabis Association
          </Typography>
          <hr/>
          <Typography variant="subtitle1" color="textSecondary">
          Level: {user.availableJoints.count}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            XP: {user.availableSeeds.length}
          </Typography>
        </CardContent>
        </Grid>
        </div>
        <hr/>
        <div className={classes.details}>
        <br/>
        <ProfileDetails />  
        </div>
    </Card>
  );
}