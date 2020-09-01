import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DiamondTabInfo from './DiamondTabInfo';
import EmeraldTabInfo from './EmeraldTabInfo';
import Typography from '@material-ui/core/Typography';
import RubyTabInfo from './RubyTabInfo';
import SaphireTabInfo from './SaphireTabInfo';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: "#3f4f7c",
    color: theme.palette.text.secondary,
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-start',
    fontFamily: '"Orbitron", sans-serif',
    color: "#977630",
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Typography className={classes.title} variant="h5">
                  <b>Non-Fungible Assets</b>
                  </Typography>
                  <hr/>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}><DiamondTabInfo /></Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}><EmeraldTabInfo /></Paper>
        </Grid>
        </Grid>
        <Grid container spacing={3}><Grid item xs={12}></Grid><br/><br/><br/></Grid>
        <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}><RubyTabInfo /></Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}><SaphireTabInfo /></Paper>
        </Grid>
        
      </Grid>
    </div>
  );
}