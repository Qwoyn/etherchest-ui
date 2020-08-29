import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  card: {
    maxWidth: 1200,
  },
  media: {
    height: 200,
  },
});

export default function InstructionsCardTwo() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/SRSOAng.png"
        />
    </Card>
  );
}