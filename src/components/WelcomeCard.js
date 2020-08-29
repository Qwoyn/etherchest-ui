import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ParallaxBanner } from 'react-scroll-parallax';

const useStyles = makeStyles({
  card: {
    maxWidth: 1200,
  },
  media: {
    height: 100,
  },
});

export default function WelcomeCard() {
  const classes = useStyles();

  return (
    <div>
      <center>
    <img src="https://i.imgur.com/MQYSNVK.png"></img>
    </center>
    </div>
  );
}