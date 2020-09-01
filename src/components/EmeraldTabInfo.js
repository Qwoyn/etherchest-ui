import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    backgroundColor: "#647399",
  },
});

export default function EmeraldTabInfo() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="https://pbs.twimg.com/profile_images/926216109791023104/_zMYwO9L_400x400.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Emerald Stake
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Number of Emeralds:   10
          </Typography>
          <hr/>
          <Typography variant="body2" color="textSecondary" component="p">
            Chest Value:   1 ETH
          </Typography>
        </CardContent>
        <CardActions>
        <Button variant="contained" color="secondary">
        Send
        </Button>
        <Button variant="contained" color="primary">
        Get Emeralds
        </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}