import React from "react";
import {withRouter} from "react-router-dom";
import Container from '@material-ui/core/Container';
import LoginPage from "./components/LoginPage";
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#000000",
  },
}));  

export const Partners = () => {
  const classes = useStyles();
    return (
      <Container fixed>
      <div className="card-blank">
        <div className="p-fluid">
        <center>
        <Paper className={classes.paper}>
                <center>
                <font color="#ffffff"><b><u>We Proudly Support:</u></b></font>
                </center>
                <br/>
                <a href="https://www.steempeak.com/@hashkings">
                <img
                    alt="Steempeak Logo"
                    src="https://i.imgur.com/Zx6h5XB.png"
                  />
                </a>
                <br/> 
                <a href="https://www.steempeak.com/@canna-curate">
                <img
                    alt="Canna-Curate Logo"
                    src="https://i.imgur.com/nc04iwsm.png?1"
                  />
                </a>
                <br/>
                </Paper> 
        </center>
        </div>
        
	  </div></Container>
    );
};

export default withRouter(Partners);