import React from "react";
import BuySeed from "./BuySeed";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#294A0B",
  },
  font : {
    fontFamily: '"Jua", sans-serif',
  },
  paperBlue: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#154A4A",
  },
  paperBlack: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#154A4A"
  },
  paperBlacky: {
    padding: theme.spacing(1),
    backgroundColor: "#000000",
  },
  card: {
    maxWidth: 345,
    backgroundColor: "#000000",
  },
  media: {
    height: 140,
  },
}));

export const MarketSeeds = () => {  
  const classes = useStyles();

  return(
    <Paper className={classes.paperBlacky}>
    <Paper className={classes.paperBlue}>
    <Grid container spacing={3}>
      <Grid item xs>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/vAUGcFV.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          <font color="DFB17B">Genesis Seeds</font>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          <font color="DFB17B">These seeds are the first round of seeds, are extremely rare and are used to make beta seeds.</font>
          </Typography>
          <br/>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          <font color="DFB17B"><b>Price: 5 STEEM</b></font>
          </Typography>
              <label htmlFor="multiselect" />
            <BuySeed type="t" />
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={8}>
      <Paper className={classes.paper}>
      <Typography paragraph className={classes.font}>
        <font color="DFB17B">Hashkings Seeds are the main driving force behind the game. 
        </font>
      </Typography>
      <Typography paragraph className={classes.font}>
        <font color="DFB17B">With these seeds it is possible to grow plants, 
        create new seeds and earn STEEM. Unlike our in-game currency Kief(KFQ), 
        seeds are custom designed tokens by @disregardfiat and only available within our ecosystem, 
        NOT tradable on Steem-Engine.</font>
      </Typography>
      <Typography paragraph className={classes.font}>
        <font color="DFB17B">Original first round of seeds, purchased in the Hashkings Seed Bank or bought from other players. 
        These limited edition seeds cannot be grown and are limited in number. We call 
        them the Genesis Seeds because they are the first ones and give life to the beta seeds after harvest.</font>
      </Typography>
      <Typography paragraph className={classes.font}>
        <font color="red">Click next when you are finished!</font>
      </Typography>
      </Paper>    
  </Grid>
    </Grid>
    </Paper>
  </Paper>
  )
};
