import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 50,
    backgroundColor: "#000000"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    fontFamily: '"Orbitron", sans-serif',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function DiamondTabInfo() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} gutterBottom><font color="white">
          Total Value: 4 ETH</font>
        </Typography>
        <hr/>
        <Typography className={classes.title} gutterBottom><font color="white">
          Total Diamonds: 4</font>
        </Typography>
      </CardContent>
    </Card>
  );
}