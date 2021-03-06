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

export default function DiamondTabInfo() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="https://wiki.geministation.com/images/4/47/Polished_Diamond.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Diamond Stake
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Number of Diamonds:   5
          </Typography>
          <hr/>
          <Typography variant="body2" color="textSecondary" component="p">
            Value:   5 ETH
          </Typography>
        </CardContent>
        <CardActions>
        <Button variant="contained" color="secondary">
        Send
        </Button>
        <Button variant="contained" color="primary">
        Get Diamonds
        </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}