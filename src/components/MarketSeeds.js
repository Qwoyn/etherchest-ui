import React, { useContext } from "react";
import BuySeed from "./BuySeed";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router';
import { Parallax } from 'react-parallax';
import Box from '@material-ui/core/Box';
import {StateContext} from "../App";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#294A0B",
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
    backgroundColor: "#154A4A",
  },
  media: {
    height: 140,
  },
  font: {
    fontFamily: '"Jua", sans-serif',
  },
}));

export const MarketSeeds = () => {
  const {username} = useContext(StateContext);
  const seedBackground = "https://i.imgur.com/Kio2LW4.jpg";

  const theme = createMuiTheme({
    palette: {
      primary: { 500: '#00211B' }, // custom color in hex 
    },
  });
  
  const classes = useStyles();
  
  if (username) {
  return(
    <Paper className={classes.paperBlacky}>
      <Parallax blur={1} bgImage={seedBackground} strength={500}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <Box boxShadow={4}>
        <Paper className={classes.paperBlack}>   
          <ThemeProvider theme={theme}>
            <Typography gutterBottom variant="h5" component="h1">
              <b><font color="#DFB17B" className={classes.font}><u>Welcome to the Seedbank</u></font></b>
            </Typography>
          </ThemeProvider>
        </Paper>
        </Box>
      </Grid>
      <Grid item xs>
      <Box boxShadow="auto">
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/vAUGcFV.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Genesis Seeds</font>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <font color="DFB17B" className={classes.font}>These seeds are the first round of seeds, are extremely rare and are used to make beta seeds.</font>
          </Typography>
          <br/>
          <Typography variant="body2" color="textSecondary" component="p">
          <font color="DFB17B" className={classes.font}><b>Price: 5 STEEM</b></font>
          </Typography>
              <label htmlFor="multiselect" />
            <BuySeed type="t" />
        </CardContent>
      </Card>
      </Box> 
    </Grid>
    <Grid item xs>
    <Box boxShadow="auto">
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://d3atagt0rnqk7k.cloudfront.net/wp-content/uploads/2016/04/29195549/cannabis-seeds-101-all-you-need-to-know-and-more.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Beta Seeds</font>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <font color="DFB17B" className={classes.font}>This is the second round of seeds, acquired through growing a genesis seed into a mature plant and harvesting.</font>
          </Typography>
          <br/>
          <Typography variant="body2" color="textSecondary" component="p">
          <font color="DFB17B" className={classes.font}><b><i>Only Available through trade. Please visit the <a href="https://discord.gg/hWJed7s">Discord Server</a></i></b></font>
          </Typography>
          {/*<BuySeed type="m" />*/}
        </CardContent>
      </Card>
      </Box>
    </Grid>
    <Grid item xs>
    <Box boxShadow="auto">
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/x1eOPYj.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>HK Seeds</font>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <font color="DFB17B" className={classes.font}>These are the full version seeds not yet available. They will contain the genetic code which make up the traits, terps and sex of the cannabis strain you are growing. 
          These seeds will be also broken down in to Sativa, Indica and Ruderalis.</font>
          </Typography>
          <br/>
          <Typography variant="body2" color="textSecondary" component="p">
          <font color="DFB17B" className={classes.font}><b>Price: TBD</b></font>
          </Typography>
          {/*<BuySeed type="r" />*/}
        </CardContent>
      </Card>
      </Box>
    </Grid>
    </Grid>
    </Parallax>
  </Paper>
  )
} else {
  return (
  <Redirect to='/login'/>
  );
}
};
