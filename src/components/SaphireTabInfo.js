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

export default function SaphireTabInfo() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="EtherChest Saphire"
          height="140"
          image="https://pngimg.com/uploads/sapphire/sapphire_PNG15.png"
          title="Saphire"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Sapphire Stake
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Number of Sapphires:   15
          </Typography>
          <hr/>
          <Typography variant="body2" color="textSecondary" component="p">
            Value:   7 ETH
          </Typography>
        </CardContent>
        <CardActions>
        <Button variant="contained" color="secondary">
        Send
        </Button>
        <Button variant="contained" color="primary">
        Get Sapphires
        </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}