import React from "react";
import {withRouter} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#000000",
    fontFamily: '"Jua", sans-serif',
    },
}));  

export const Partners = () => {
  const classes = useStyles();
    return (
        <div>
        <center>
        <Paper className={classes.paper}>
                <center>
                  <br/>
                <a href="https://www.steempeak.com/@canna-curate">
                <img
                    alt="Canna-Curate Logo"
                    src="https://i.imgur.com/PODmkTet.png"
                  />
                </a>
                <br/>
                <a href="https://www.twiztedmonkey.com/">
                <img
                    alt="TwiztedMonkey Logo"
                    src="https://i.imgur.com/eQlRywXt.jpg"
                  />
                </a>
                <br/>
                <a href="https://www.gameit.io/">
                <img
                    alt="GameIT Logo"
                    src="https://i.imgur.com/gzqQao2s.png"
                  />
                </a>
                <br/>
                <br/>
                <a href="https://www.steempeak.com/@hashkings">
                <img
                    alt="Steempeak Logo"
                    src="https://i.imgur.com/Zx6h5XB.png"
                  />
                </a>
                </center>
                </Paper> 
        </center>
        </div>  
    );
};

export default withRouter(Partners);