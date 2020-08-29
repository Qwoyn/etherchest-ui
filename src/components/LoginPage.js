import React, {useState, useContext, useEffect} from "react";
import {withRouter} from "react-router-dom";
import {StateContext} from "../App";
import useSteemKeychain from "../hooks/useSteemKeychain";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { HashkingsAPI } from "../service/HashkingsAPI";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://steem.hashkings.app">
        Qwoyn.io
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '80vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/user/kimzy/1600x900)', // main carousel
    // backgroundImage: 'url(https://i.imgur.com/vZ7ShWv.png)', // twiztedmonkey
    // backgroundImage: 'url(https://i.imgur.com/GkgOq4F.png)', // shirt sale
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    alt: 'https://source.unsplash.com/user/kimzy/1600x900',
    width: '100%',
    /*command: () => {
      window.open('https://www.twiztedmonkey.com', '_blank');
    }*/
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#ffffff',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    fontFamily: '"Jua", sans-serif',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    margin: theme.spacing(1),
  },
  font: {
    fontFamily: '"Jua", sans-serif',
  },
}));

export const LoginPage = ({history}) => {
  const hashkingsApi = new HashkingsAPI();
  const [username, setUsername] = useState("");
  const {steemConnectAPI, login} = useContext(StateContext);
  const [loggingIn, setLoggingIn] = useState(false);
  const hasSteemKeychain = useSteemKeychain();
  const isDesktop = window.innerWidth < 790;

  const keychainLoggedIn = (_, token) => {
    if (token) {
      steemConnectAPI.setAccessToken(token);
      steemConnectAPI
        .me()
        .then(res => {
          login(res.name);
          localStorage.setItem("sc_token", token);
          if (!isDesktop) {
          history.push("/home");
        } else {
          history.push("/home");
        }
        })
        .catch(e => {
          console.log(e);
          setUsername("");
          setLoggingIn(false);
        });
    } else {
      setUsername("");
      setLoggingIn(false);
    }
  };

  const [validatedTo, setValidatedTo] = useState();

  useEffect(() => {
    hashkingsApi.steemUserExists(username).then(username => {
      if (username) {
        setValidatedTo(username);
      } else {
        setValidatedTo();
      }
    });
  }, [username]);

  const Login = () => {
    setLoggingIn(true);
    steemConnectAPI.login({username}, keychainLoggedIn);
  };

  const loginLabelPrefix = loggingIn ? "Logging in with" : "Login with";
  const loginLabelSuffix = hasSteemKeychain()
    ? "STEEM Keychain"
    : "SteemConnect";

    const classes = useStyles();

    return (
    <Grid container component="main" className={classes.root}>
      {/*{!isDesktop ? (
        <PostDialog />
      ) : ( 
        <div></div>
      )}      
    {/*<CssBaseline 
    color="#000000"
    />*/}
    <Grid item xs={false} sm={4} md={7} className={classes.image}>
    </Grid>
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
    <div className={classes.paper}>
      <center>
      <img
        alt="Hashkings Banner"
        src={`https://i.imgur.com/jvJLKua.png`}
        />
      </center>
      <br/>
      
    </div>
      <div className={classes.paper}>
        
        <Avatar className={classes.avatar}>
        {validatedTo && (
        <div>
          <img
          alt="STEEM Avatar"
          src={`https://steemitimages.com/u/${validatedTo}/avatar/small`}
          />
          </div>
          )}
        </Avatar>
        <form className={classes.form} validate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="STEEM Account"
            value={username}
            autoFocus
            onChange={e => setUsername(e.target.value)}
            className={classes.font}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={Login}
            label={`${loginLabelPrefix} ${loginLabelSuffix}`}
            className={classes.font}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="https://signup.steemit.com/" variant="body2" className={classes.font}>
                {"Don't have a STEEM account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <center>
          <Box mt={5} className={classes.font}>
            <Copyright />
          </Box>
          </center>
        </form>
      </div>
    </Grid>
  </Grid>
  );

};

export default withRouter(LoginPage);
