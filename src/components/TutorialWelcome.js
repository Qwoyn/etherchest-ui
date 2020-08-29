import React, { useContext, useState } from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {StateContext} from "../App";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import WaterModal from "./WaterModal";
import { Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  font: {
    fontFamily: '"Jua", sans-serif',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#0C1243",
    fontFamily: '"Jua", sans-serif'
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
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#000000",
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

export const TutorialWelcome = () => {
  const {username} = useContext(StateContext);
  const classes = useStyles();

  const [waterModal, setWaterModal] = useState(false);
  const [user] = useState({
    availableSeeds: [],
    activeGardens: [],
    availableGardens: [],
    headBlockNum: undefined
  });
  const [headBlockNum] = useState(0);

  return(
    <Container>
    <Paper className={classes.paperBlack}>
    <Paper className={classes.paperBlue}>
    <Grid container spacing={1}>
    <Grid item xs={8}></Grid>
    <Grid item xs={8}>
      <Paper className={classes.paper}>
      <Typography paragraph>
        <font color="DFB17B" className={classes.font}>HashKings® is a Crypto Cannabis Farming and Trading Game, 
        Curation Trail and Community on the STEEM Blockchain. Users delegate Steem Power, 
        purchase seeds and propagate plants for daily rewards.</font>
      </Typography>
      <Typography paragraph>
        <font color="DFB17B" className={classes.font}>As a Hashkings Farmer you will grow unique 
        strains, each with their own traits, sell them or use them to continue playing for free!</font>
      </Typography>
      <Typography paragraph>
        <font color="DFB17B" className={classes.font}>A custom API powers Hashkings along with react.js and steem.js. 
        Start your journey to cannabis connoisseur today!</font>
      </Typography>
      <Typography paragraph>
        <font color="DFB17B" className={classes.font}><b>In this tutorial you will be guided through the basics of Hashkings ie. Delegating, Planting and Watering</b></font>
      </Typography>
      </Paper>    
  
    </Grid>
    <Grid item xs={4}>
  <Card className={classes.card}>
    <CardMedia
      className={classes.media}
      image="https://i.imgur.com/TLlmPMi.png"
      title="Hashkings"
    />
  </Card>
  </Grid>
  </Grid>
    </Paper>
    <WaterModal
          isOpen={waterModal}
          toggleModal={() => setWaterModal(!waterModal)}
          activeGardens={user.activeGardens}
          username={username}
          headBlockNum={headBlockNum}
        />
  </Paper>
  </Container>
  )
};
