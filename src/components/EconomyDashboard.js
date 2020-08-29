import React, {useContext, useState, useEffect} from "react";
import { Redirect } from 'react-router';
import { HashkingsAPI } from "../service/HashkingsAPI";
import {StateContext} from "../App";
import {withRouter} from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { fadeInDown } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = { 
  fadeInDown: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
  },
  fadeInDown1: {
    animation: 'x 2s',
    animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
  },
  fadeInDown2: {
    animation: 'x 3s',
    animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    '& > svg': {
      margin: theme.spacing(2),
    },
  },
  flex: {
    flexGrow: 1,
  },
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
    backgroundColor: "#095938",
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

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#000000",
    color: '#DFB17B',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const hashkingsApi = new HashkingsAPI();

export const EconomyDashboard = () => {
    const {username} = useContext(StateContext);
    const classes = useStyles();
  
    const [dashboardStats, setDashboardStats] = useState({
      gardeners: 0,
      gardens: 0,
      availableSeeds: 0,
      activeGardens: 0,
      availableGardens: 0,
      activity: [],
      delegation: 0,
      leaderboard: []
    });
  
    const [user, setUser] = useState({
      availableSeeds: [],
      activeGardens: [],
      availableGardens: [],
      headBlockNum: undefined
    });
  
    const [gardens, setGardens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [setNoMoreHistory] = useState(false);
  
    const [headBlockNum, setHeadBlockNum] = useState(0);
  
    useEffect(() => {
      if (username) {
        hashkingsApi.getUserGarden(username).then(garden => {
          const {headBlockNum, ...user} = garden;
          setUser(user);
          setHeadBlockNum(headBlockNum);
        });
      }
    }, [username]);
  
    useEffect(() => {
      hashkingsApi
        .getDashboardStats(username)
        .then(stats => {
          if (username) {
            setDashboardStats(stats);
          } else {
            setDashboardStats({
              ...dashboardStats,
              ...stats
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    }, [username]);
  
    useEffect(() => {
      if (username) {
        setLoading(true);
        hashkingsApi.getDGPO().then(dgpo => {
          const spv =
            parseFloat(dgpo.total_vesting_fund_steem.split(" ")[0]) /
            parseFloat(dgpo.total_vesting_shares.split(" ")[0]);
          Promise.all([
            hashkingsApi
              .getAccountHistory(spv, username, false)
              .then(
                ({
                  stop,
                  date
                }) => {
  
                  if (stop) {
                    setNoMoreHistory(true);
                  }
  
                  if (date) {
                  }
                }
              ),
            hashkingsApi.getUserGarden(username).then(garden => {
              setGardens(garden.activeGardens);
            })
          ]).then(() => setLoading(false));
        });
      }
    }, [username]);

if (username) {
      return (
        <div className="card-blank-green-1">        
          <div className={classes.flex}>
            <Grid container spacing={3}>
              <Grid item xs>
                  <StyleRoot>
                    <div style={styles.fadeInDown}>
                    <Card className={classes.card}>
                    <HtmlTooltip
                    title={
                    <React.Fragment>
                    <Typography color="error" className={classes.font}><u>Total Number of Active Farmers</u></Typography>
                    <em><a href="/market/seedbank">{"This is your community!"}</a></em> <b>{"Say hi to them in the Hashkings Discord"}</b>
                    </React.Fragment>
                    }
                    placement="bottom-start"
                    TransitionComponent={Zoom}
                    >
                    <CardMedia
                      className={classes.media}
                      image="https://i.imgur.com/ZI9lEAQ.jpg"
                    />
                    </HtmlTooltip>
                    <CardContent>
                      <center>
                      <Typography gutterBottom variant="h5" component="h1" className={classes.font}>
                        <b><font color="DFB17B">Farmers</font></b>
                      </Typography>
                      <Typography variant="h5" component="h2">
                      <b><font color="B28D43" className={classes.font}>{dashboardStats.gardeners}</font></b>
                      </Typography>
                      </center>
                    </CardContent>
                  </Card>
                  </div>
                  </StyleRoot>
                </Grid>
                <Grid item xs>
                <StyleRoot>
                    <div style={styles.fadeInDown1}>
                    <Card className={classes.card}>
                    <HtmlTooltip
                        title={
                        <React.Fragment>
                          <Typography color="error" className={classes.font}><u>Total Number of Farms</u></Typography>
                          <em><a href="/market/seedbank">{"These are plots which are already occupied!"}</a></em> <b>{"Is one of them yours?"}</b>
                        </React.Fragment>
                        }
                        placement="bottom"
                        TransitionComponent={Zoom}
                        >
                      <CardMedia
                        className={classes.media}
                        image="https://www.usnews.com/dims4/USNEWS/ae50a20/2147483647/thumbnail/640x420/quality/85/?url=http%3A%2F%2Fcom-usnews-beam-media.s3.amazonaws.com%2F25%2Fb1%2F8a19e6c940ddb4674c711f9e42c9%2F181204-hemp-editorial.jpg"
                      />
                    </HtmlTooltip>
                  <CardContent>
                    <center>
                    <Typography gutterBottom variant="h5" component="h1" className={classes.font}>
                      <b><font color="DFB17B">Farms</font></b>
                    </Typography>
                    <Typography variant="h5" color="textSecondary" component="h2">
                    <b><font color="B28D43" className={classes.font}>{dashboardStats.gardens}</font></b>
                    </Typography>
                    </center>
                  </CardContent>
                </Card>
                </div>
                </StyleRoot>
            </Grid>
          <Grid item xs>
          <StyleRoot>
            <div style={styles.fadeInDown2}>
                <Card className={classes.card}>
                <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}><u>Total Steem Power Delegated</u></Typography>
                  <em><a href="/market/seedbank">{"This is our total Economy"}</a></em> <b>{"This number is based on total SP delegated and STEEM powered up from Seed Sales"}</b>
                </React.Fragment>
              }
              placement="bottom-end"
              TransitionComponent={Zoom}
              >
                  <CardMedia
                    className={classes.media}
                    image="https://www.moneycrashers.com/wp-content/uploads/2019/04/gross-domestic-product-definition-1068x713.jpg"
                  />
                  </HtmlTooltip>
                  <CardContent>
                    <center>
                      <Typography gutterBottom variant="h5" component="h1">
                        <b><font color="DFB17B" className={classes.font}>Economy (SP)</font></b>
                      </Typography>
                      <Typography variant="h5" color="textSecondary" component="h2">
                      <b><font color="B28D43" className={classes.font}>{dashboardStats.delegation}</font></b>
                      </Typography>
                    </center>
                  </CardContent>
                </Card>
        </div>
        </StyleRoot>
        </Grid>
      </Grid>
      </div>
      </div>
    );
  } else {
    return (
    <Redirect to='/login'/>
    );
  }
};

export default withRouter(EconomyDashboard);