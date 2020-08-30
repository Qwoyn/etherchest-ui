import React, {useContext} from "react";
import {StateContext} from "../App";
import GardenActions from './GardenActions';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
 
const useStyles = makeStyles(theme => ({
root: {
  flexGrow: 1,
},
paper: {
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  whiteSpace: 'wrap',
  marginBottom: theme.spacing(3),
  backgroundColor: "Transparent",
},
}));

export const HomePage = (user) => {
  const {username} = useContext(StateContext);
  const classes = useStyles();
  const isDesktop = window.innerWidth < 1000;
  
  const farmBackground = "https://i.imgur.com/C3lrbDj.png";


    return (
      <div className={classes.root}>
          <br/>
          <Container>
          <GardenActions />
          </Container>
          <br/>
      </div>
    );
  
};
