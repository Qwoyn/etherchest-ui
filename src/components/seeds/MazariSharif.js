import React, {useContext, useState} from "react";
import {withRouter} from "react-router-dom";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Parallax } from 'react-parallax';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import WelcomeCard from '../WelcomeCard';
import SwipeableViews from 'react-swipeable-views';
import AcapulcoAvail from '../AcapulcoAvail';
import {Button} from "primereact/button";
import {StateContext} from "../../App";
import {sign} from "steemconnect";
import useSteemKeychain from "../../hooks/useSteemKeychain"; 
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import SeedGifting from './SeedGifting';
import {seedTypes} from '../../service/HashkingsAPI';
import { DealIcon, StoreIcon, GiftIcon } from "../Icons";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    backgroundColor: "transparent",
    color: '#DFB17B',
    fontFamily: '"Jua", sans-serif',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  card: {
    backgroundColor: "#062B3D",
  },
  media: {
    height: 140,
  },
  background: {
    backgroundColor: "#154A4A",
  },
  font: {
    fontFamily: '"Jua", sans-serif',
    color: '#DFB17B',
  },
  fontDark: {
    fontFamily: '"Jua", sans-serif',
    color: '#5E659A',
  },
}));

export const MazariSharif = () => {
  const classes = useStyles();
  const image1 = "https://i.imgur.com/j2CGYh2.jpg";
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const {username} = useContext(StateContext);
  const [seed, setSeed] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSteemKeychain = useSteemKeychain();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (username) {
      setIsSubmitting(true);

      const memo = `tseed mis`;
      const to = "hashkings";
      const amount = seedTypes["t"].str;
      const currency = "STEEM";

      if (hasSteemKeychain()) {
        const steem_keychain = window.steem_keychain;
        try {
          await new Promise((resolve, reject) => {
            return steem_keychain.requestTransfer(
              username,
              to,
              amount,
              memo,
              currency,
              response => {
                if (response.success) {
                  resolve(response);
                } else {
                  reject();
                }
              },
              true
            );
          });
          setIsSubmitting(false);
          setSeed();
        } catch {
          setIsSubmitting(false);
        }
      } else {
        window.location.href = sign(
          "transfer",
          {
            to,
            from: username,
            amount: `${amount} ${currency}`,
            memo
          },
          process.env.REACT_APP_URL
            ? `${process.env.REACT_APP_URL}/markets`
            : "https://steem.hashkings.app/markets"
        );
      }
    }
  };

  let buttonLabel = "Purchase";
  if (isSubmitting) buttonLabel = "Purchasing";
  if (!username) buttonLabel = "Please Sign in";

    return (
      <Parallax blur={1} bgImage={image1} strength={500}>
      <Container fixed>
      <div className={classes.root}>
      <WelcomeCard />
      <br/><hr/><br/>
      <Grid container spacing={3}>
        <Grid item xs>
          <Card className={classes.paper} raised={true}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="Mazar i Sharif" src="https://i.imgur.com/lE9RG6a.png" />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                  <Typography gutterBottom variant="h4" component="h2" className={classes.font}>
                      <font color="#8C3820"><b>
                      Mazar i Sharif</b>
                      </font>
                    </Typography>
                    <Typography variant="body2" gutterBottom className={classes.font}>
                      Landrace Strain
                    </Typography>
                    <Typography variant="body2" className={classes.font}>
                      ID: 1030114
                    </Typography>
                  </Grid>
                  <Grid item>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="h5" className={classes.fontDark}>Indica</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
          <div className={classes.root}>
      <AppBar position="dynamic" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="error"
          variant="fullWidth"
          aria-label="Market Tabs"
          className={classes.background}
        >
          <Tab icon={<StoreIcon />} {...a11yProps(0)} className={classes.font} />
          <Tab icon={<DealIcon />} {...a11yProps(1)} className={classes.font} disabled={true} />
          <Tab icon={<GiftIcon />} {...a11yProps(2)} className={classes.font} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Grid item xs>
          <Card className={classes.card} raised={true}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <font color="DFB17B" className={classes.font}>Hashkings Official Genesis Seed</font>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}>
                This seed is part of the first round of seeds and extremely rare. 
                It can be used to make beta seeds.
              </font>
              </Typography>
              <br/>
              <br/>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}><b>Price: 5 STEEM</b></font>
              </Typography>
              <br/>
              <Button
              disabled={isSubmitting || !username}
              label={buttonLabel}
              onClick={handleSubmit}
              />
            </CardContent>
          </Card>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <AcapulcoAvail />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <SeedGifting />
        </TabPanel>
      </SwipeableViews>
    </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
    </Container>
    </Parallax>
    );
};

export default withRouter(MazariSharif);