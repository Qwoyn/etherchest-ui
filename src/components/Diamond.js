import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: "#392968",
  },
  media: {
    height: 0,
    paddingTop: '99.25%', // 16:9
  },
}));

export default function DiamondCard() {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
    <Grid item xs>
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://i.pinimg.com/originals/a8/48/a0/a848a06890785584a95a83ab7f561b3a.png"
        title="diamond"
      />
    </Card>
    </Grid>
    </Grid>
  );
}