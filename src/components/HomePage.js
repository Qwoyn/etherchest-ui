import React from "react";
import { Dashboard } from './Dashboard';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
 
const useStyles = makeStyles(theme => ({
root: {
  flexGrow: 1,
},
}));

export const HomePage = (user) => {
  const classes = useStyles();
    return (
      <div className={classes.root}>
          <br/>
          <Container>
          <Dashboard />
          </Container>
          <br/>
      </div>
    );
  
};
