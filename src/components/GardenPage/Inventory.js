import React from "react";
import { gardenNames, seedNames, gardenLinkNames, seedLinkNames } from "../../service/HashkingsAPI";
import {  makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import _ from "lodash";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { FarmIcon, SubdivisionIcon, SeedSvgIcon, DnaIcon, BongIcon, GiftIcon, LandIcon, SeedIcon } from '../Icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BuildTwoToneIcon from '@material-ui/icons/BuildTwoTone';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { ExpansionPanelDetails } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

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
  flex: {
    flexGrow: 1,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    marginTop: theme.spacing(1)
  },
  background: {
    backgroundColor: "#073232"
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#073232",
  },
  margin: {
    margin: theme.spacing(2),
    whiteSpace: 'wrap',
    scrollable: true
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
  card: {
    backgroundColor: "#001E1E",
    whiteSpace: 'wrap',
    scrollable: true
  },
  media: {
    height: 140,
  },
  paperFarming: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#073232",
  },
  font: {
    fontFamily: '"Jua", sans-serif',
    color: '#DFB17B',
    whiteSpace: 'wrap',
    scrollable: true
  },
  extension: {
    backgroundColor: "transparent",
    whiteSpace: 'wrap',
  }
}));

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#000000',
    color: '#DFB17B',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export default function Inventory({user}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };
  const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

  return (
  <div className={classes.flex}>
    <AppBar position="dynamic" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="error"
          variant="scrollable"
          aria-label="Market Tabs"
          className={classes.background}
        >
          <Tab icon={<LandIcon />} {...a11yProps(0)} className={classes.font} />
          <Tab icon={<SeedIcon />} {...a11yProps(1)} className={classes.font} />
          <Tab icon={<DnaIcon />} {...a11yProps(2)} className={classes.font} />
          <Tab icon={<BongIcon />} {...a11yProps(3)} className={classes.font} />
          <Tab icon={<BuildTwoToneIcon />} {...a11yProps(4)} className={classes.font} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
      <Grid container spacing={2}>
      <Grid item xs>
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="error" className={classes.font}><u>Active Plots</u></Typography>
            <em><a href="/market/seedbank">{"Farm plots which are currently earning"}</a></em> <b>{"Do you need another Plot?  Visit the Market!"}</b>
          </React.Fragment>
        }
        TransitionComponent={Zoom}
        >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/vAUGcFV.png"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Active Plots</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.activeGardens.length} color="primary">
                  <FarmIcon  />
                </Badge>
                </Typography>
              </font></b>
              <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Plots</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Grid container spacing={2}>
          {_.uniqBy(user.activeGardens, garden => garden.id[0])
            .map(garden => ({
              id: garden.id[0],
              count: user.activeGardens.filter(
                agarden => agarden.id[0] === garden.id[0]
              ).length
            }))
            .map(garden => (
              <Link
                component={Link1} 
                to={'/plots/' + gardenLinkNames[garden.id]}
                variant="body2"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
              <b><font color="B28D43" className={classes.font}><p key={garden.id}>
                <Badge className={classes.margin} badgeContent={garden.count} color="primary">
                  <FarmIcon  />
                </Badge>
                    {gardenNames[garden.id]}
                {garden.count !== 1 ? "" : ""}
              </p></font></b></Link>
            ))}
            
            <Grid item xs>
              </Grid>
              {/*<AvailableSeedTable />*/}
            </Grid>
            
            </ExpansionPanelDetails>
            </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    <Grid item xs>
    <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="error" className={classes.font}><u>Available Plots</u></Typography>
                      <em><a href="/market/seedbank">{"These plots are ready to go!"}</a></em> <b>{"Do you have extra Seeds?  These plots are available to be farmed."}</b>
                    </React.Fragment>
                  }
                  TransitionComponent={Zoom}
                  >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/x1eOPYj.png"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Plots</font>
          </Typography>
              <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availableGardens.length} color="primary">
                  <FarmIcon  />
                </Badge>
                </Typography>
              </font></b>
          <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Plots</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          {_.uniqBy(user.availableGardens, garden => garden[0])
            .map(garden => ({
              id: garden[0],
              count: user.availableGardens.filter(
                agarden => agarden[0] === garden[0]
              ).length
            }))
            .map(garden => (
              <Link
                component={Link1} 
                to={'/plots/' + gardenLinkNames[garden.id]}
                variant="body2"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
              <b><p key={garden.id}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent={garden.count} color="error">
                  <FarmIcon  />
                </Badge>
                 {gardenNames[garden.id]}
                {garden.count !== 1 ? " Plots" : ""}</font>
              </p></b> 
              </Link>
            ))}
            </ExpansionPanelDetails>
            </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    </Grid>

<Grid container spacing={2}>
    <Grid item xs>
    <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="error" className={classes.font}><u>Coming Soon</u></Typography>
                     <b>{"Once the subdivisions feature is available this will show your available subdivisions"}</b>
                    </React.Fragment>
                  }
                  TransitionComponent={Zoom}
                  >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/MCnWKee.png"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Subdivisions</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availableGardens.length * 10} color="primary">
                  <SubdivisionIcon  />
                </Badge>
                </Typography>
              </font></b>
              <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Subdivisions</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          {_.uniqBy(user.availableGardens, garden => garden[0])
            .map(garden => ({
              id: garden[0],
              count: user.availableGardens.filter(
                agarden => agarden[0] === garden[0]
              ).length
            }))
            .map(garden => (
              <b><p key={garden.id}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent={garden.count} color="error">
                  <SubdivisionIcon  />
                </Badge>
                </font>
              </p></b> 
            ))}
            </ExpansionPanelDetails>
            </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    
    <Grid item xs>
    <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="error" className={classes.font}><u>Coming Soon</u></Typography>
                      <b>{"Once the subdivisions feature is available this will show your Rented Subdivisions"}</b>
                    </React.Fragment>
                  }
                  TransitionComponent={Zoom}
                  >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/ZUyNK5H.png"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Rented Subdivisions</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent='0' color="primary">
                  <SubdivisionIcon  />
                </Badge>
                </Typography>
              </font></b>
              <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Subdivisions</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          {_.uniqBy(user.gardens, garden => garden[0])
            .map(garden => ({
              id: garden[0],
              count: user.gardens.filter(
                agarden => agarden[0] === garden[0]
              ).length
            }))
            .map(garden => (
              <b><p key={garden.id}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent='0' color="error">
                  <SubdivisionIcon  />
                </Badge>
                 {gardenNames[garden.id]}
                {garden.count !== 1 ? "s" : ""}</font>
              </p></b> 
            ))}
            </ExpansionPanelDetails>
            </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    </Grid>
    </TabPanel>

    <TabPanel value={value} index={1} dir={theme.direction}>
<Grid container spacing={2}>
    <Grid item xs>
    <HtmlTooltip
    title={
    <React.Fragment>
    <Typography color="error" className={classes.font}><u>Available Seeds</u></Typography>
    <em><a href="/market/seedbank">{"Total number of available seeds you own"}</a></em> <b>{"Plant them on an extra plot or trade them above!"}</b>
    </React.Fragment>
    }
    TransitionComponent={Zoom}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://d3atagt0rnqk7k.cloudfront.net/wp-content/uploads/2016/04/29195549/cannabis-seeds-101-all-you-need-to-know-and-more.jpg"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Seeds</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availableSeeds.length} color="primary">
                  <SeedSvgIcon  />
                </Badge>
                </Typography>
              </font></b>
              <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Seeds</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.font}>
          {_.uniqBy(user.availableSeeds, seed => seed.strain)
            .map(seed => ({
              strain: seed.strain,
              count: user.availableSeeds.filter(
                aseed => aseed.strain === seed.strain
              ).length
            }))
            .map(seed => (
              <Link
                component={Link1} 
                to={'/seeds/' + seedLinkNames[seed.strain]}
                variant="body2"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
              <p key={seed.strain}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent={seed.count} color="primary">
                  <SeedSvgIcon />
                </Badge>
                 {seedNames[seed.strain]}
                {seed.count !== 1 ? "s" : ""}</font>
              </p>
              </Link>
            ))}
            </ExpansionPanelDetails>
            </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    <Grid item xs>
    <HtmlTooltip
    title={
    <React.Fragment>
    <Typography color="error" className={classes.font}><u>Available Pollen</u></Typography>
    <em><a href="/market/seedbank">{"Total amount of pollen you own"}</a></em> <b>{"Use Pollen to create hybrids!"}</b>
    </React.Fragment>
    }
    TransitionComponent={Zoom}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://cannabislifenetwork.com/wp-content/uploads/2019/12/wp-15760282384073593937729912723953.jpg"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Pollen</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availablePollen.length} color="primary">
                  <DnaIcon  />
                </Badge>
                </Typography>
              </font></b>
              <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Pollen</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          {_.uniqBy(user.availablePollen, pollen => pollen.strain)
            .map(pollen => ({
              strain: pollen.strain,
              count: user.availablePollen.filter(
                apollen => apollen.strain === pollen.strain
              ).length
            }))
            .map(pollen => (
              <Link
                component={Link1} 
                to={'/seeds/' + seedLinkNames[pollen.strain]}
                variant="body2"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
              <p key={pollen.strain}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent={pollen.count} color="primary">
                  <DnaIcon  />
                </Badge>
                 {seedNames[pollen.strain]}
                {pollen.count !== 1 ? "s" : ""}</font>
              </p>
              </Link>
            ))}
          </ExpansionPanelDetails>
          </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    </Grid>
    <br/>
    <Grid item xs>
    <HtmlTooltip
    title={
    <React.Fragment>
    <Typography color="error" className={classes.font}><u>Available Buds</u></Typography>
    <em><a href="/market/seedbank">{"Total amount of bud you own"}</a></em> <b>{"Use bud to create new items!"}</b>
    </React.Fragment>
    }
    TransitionComponent={Zoom}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/zUL2lCj.jpg?1"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Buds</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availableBuds.length} color="primary">
                  <BongIcon  />
                </Badge>
                </Typography>
              </font></b>
              <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Buds</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          {_.uniqBy(user.availableBuds, buds => buds.strain)
            .map(buds => ({
              strain: buds.strain,
              count: user.availableBuds.filter(
                abuds => abuds.strain === buds.strain
              ).length
            }))
            .map(buds => (
              <Link
                component={Link1} 
                to={'/seeds/' + seedLinkNames[buds.strain]}
                variant="body2"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
              <p key={buds.strain}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent={buds.count} color="primary">
                  <BongIcon />
                </Badge>
                 {seedNames[buds.strain]}
                {buds.count !== 1 ? " Buds" : " Bud"}</font>
              </p>
              </Link>
            ))}
          </ExpansionPanelDetails>
          </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    </TabPanel>

    <TabPanel value={value} index={2} dir={theme.direction}>
      <Grid container spacing={2}>
          <Grid item xs>
          <HtmlTooltip
          title={
          <React.Fragment>
          <Typography color="error" className={classes.font}><u>Available Kief</u></Typography>
          <em><a href="/market/seedbank">{"Total number of available seeds you own"}</a></em> <b>{"Plant them on an extra plot or trade them above!"}</b>
          </React.Fragment>
          }
          TransitionComponent={Zoom}
          >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://nug.com/wp-content/uploads/2019/11/kief-780x405.jpg"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Kief</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availableKief.length} color="primary">
                  <SeedSvgIcon  />
                </Badge>
                </Typography>
              </font></b>
              <hr/>
            <ExpansionPanel className={classes.extension}>
              <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              >
              <Typography className={classes.font}>View Kief</Typography>
              </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.font}>
          {_.uniqBy(user.availableKief, kief => kief.strain)
            .map(kief => ({
              strain: kief.strain,
              count: user.availableKief.filter(
                akief => akief.strain === kief.strain
              ).length
            }))
            .map(kief => (
              <Link
                component={Link1} 
                to={'/seeds/' + seedLinkNames[kief.strain]}
                variant="body2"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
              <p key={kief.strain}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent={kief.count} color="primary">
                  <SeedSvgIcon />
                </Badge>
                 {seedNames[kief.strain]}
                {kief.count !== 1 ? "s" : ""}</font>
              </p>
              </Link>
            ))}
            </ExpansionPanelDetails>
            </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    <Grid item xs>
    <HtmlTooltip
    title={
    <React.Fragment>
    <Typography color="error" className={classes.font}><u>Available Oil</u></Typography>
    <em><a href="/market/seedbank">{"Total amount of pollen you own"}</a></em> <b>{"Use Pollen to create hybrids!"}</b>
    </React.Fragment>
    }
    TransitionComponent={Zoom}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://lh3.googleusercontent.com/proxy/98eiNd1MVZR3tSr3-F_7eXZ33-9xjuPHRJl6QxPceDSsMyk4lKxQP5ZFrN0KxL1bPUseYvkIFsh10wG_AFoQrz2aaj5W1s7qeo1bH0cu5_-av8r8-Zc0KQxmNcapPypn5Wme4g"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Oil</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availableOil.length} color="primary">
                  <DnaIcon  />
                </Badge>
                </Typography>
              </font></b>
              <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Oil</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          {_.uniqBy(user.availableOil, oil => oil.strain)
            .map(oil => ({
              strain: oil.strain,
              count: user.availableOil.filter(
                aoil => aoil.strain === oil.strain
              ).length
            }))
            .map(oil => (
              <Link
                component={Link1} 
                to={'/seeds/' + seedLinkNames[oil.strain]}
                variant="body2"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
              <p key={oil.strain}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent={oil.count} color="primary">
                  <DnaIcon  />
                </Badge>
                 {seedNames[oil.strain]}
                {oil.count !== 1 ? "s" : ""}</font>
              </p>
              </Link>
            ))}
          </ExpansionPanelDetails>
          </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    </Grid>
    
    </TabPanel>
        
    <TabPanel value={value} index={3} dir={theme.direction}>
<Grid container spacing={2}>
    <Grid item xs>
    <HtmlTooltip
    title={
    <React.Fragment>
    <Typography color="error" className={classes.font}><u>Available Joints</u></Typography>
    <em><a href="/market/seedbank">{"Total number of available seeds you own"}</a></em> <b>{"Plant them on an extra plot or trade them above!"}</b>
    </React.Fragment>
    }
    TransitionComponent={Zoom}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://image.shutterstock.com/image-photo/beautiful-blonde-woman-smoking-cannabis-260nw-611236865.jpg"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Joints</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availableJoints.length} color="primary">
                  <SeedSvgIcon  />
                </Badge>
                </Typography>
              </font></b>
              <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Joints</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.font}>
          {_.uniqBy(user.availableJoints, joints => joints.strain)
            .map(joints => ({
              strain: joints.strain,
              count: user.availableJoints.filter(
                ajoints => ajoints.strain === joints.strain
              ).length
            }))
            .map(joints => (
              <Link
                component={Link1} 
                to={'/seeds/' + seedLinkNames[joints.strain]}
                variant="body2"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
              <p key={joints.strain}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent={joints.count} color="primary">
                  <SeedSvgIcon />
                </Badge>
                 {seedNames[joints.strain]}
                {joints.count !== 1 ? " Joints" : " Joint"}</font>
              </p>
              </Link>
            ))}
            </ExpansionPanelDetails>
            </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    <Grid item xs>
    <HtmlTooltip
    title={
    <React.Fragment>
    <Typography color="error" className={classes.font}><u>Available Blunts</u></Typography>
    <em><a href="/market/seedbank">{"Total amount of pollen you own"}</a></em> <b>{"Use Pollen to create hybrids!"}</b>
    </React.Fragment>
    }
    TransitionComponent={Zoom}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://66.media.tumblr.com/2b314e19956a272100fbec727b038b00/tumblr_p8sdup9Uzx1w7n47qo1_250.jpg"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Blunts</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availableBlunts.length} color="primary">
                  <DnaIcon  />
                </Badge>
                </Typography>
              </font></b>
              <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Blunts</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          {_.uniqBy(user.availableBlunts, blunts => blunts.strain)
            .map(blunts => ({
              strain: blunts.strain,
              count: user.availableBlunts.filter(
                ablunts => ablunts.strain === blunts.strain
              ).length
            }))
            .map(blunts => (
              <Link
                component={Link1} 
                to={'/seeds/' + seedLinkNames[blunts.strain]}
                variant="body2"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
              <p key={blunts.strain}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent={blunts.count} color="primary">
                  <DnaIcon  />
                </Badge>
                 {seedNames[blunts.strain]}
                {blunts.count !== 1 ? " Blunts" : " Blunt"}</font>
              </p>
              </Link>
            ))}
          </ExpansionPanelDetails>
          </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    </Grid>
    <br/>
    <Grid item xs>
    <HtmlTooltip
    title={
    <React.Fragment>
    <Typography color="error" className={classes.font}><u>Available Dipped Joints</u></Typography>
    <em><a href="/market/seedbank">{"Total amount of bud you own"}</a></em> <b>{"Use bud to create new items!"}</b>
    </React.Fragment>
    }
    TransitionComponent={Zoom}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://greencamp.com/wp-content/uploads/2018/11/what-is-kief.jpg"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Dipped Joints</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availableDippedJoints.length} color="primary">
                  <BongIcon  />
                </Badge>
                </Typography>
              </font></b>
              <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Dipped Joints</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          {_.uniqBy(user.availableDippedJoints, dippedjoints => dippedjoints.buds)
            .map(dippedjoints => ({
              strain: dippedjoints.buds,
              count: user.availableDippedJoints.filter(
                adippedjoints => adippedjoints.buds === dippedjoints.buds
              ).length
            }))
            .map(dippedjoints => (
              <Link
                component={Link1} 
                to={'/seeds/' + seedLinkNames[dippedjoints.buds]}
                variant="body2"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
              <p key={dippedjoints.buds}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent={dippedjoints.count} color="primary">
                  <BongIcon />
                </Badge>
                 {seedNames[dippedjoints.strain]}
                {dippedjoints.count !== 1 ? " Dipped Joints" : " Dipped Joint"}</font>
              </p>
              </Link>
            ))}
          </ExpansionPanelDetails>
          </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid><br/>
    <Grid item xs>
    <HtmlTooltip
    title={
    <React.Fragment>
    <Typography color="error" className={classes.font}><u>Available Edibles</u></Typography>
    <em><a href="/market/seedbank">{"Total amount of bud you own"}</a></em> <b>{"Use bud to create new items!"}</b>
    </React.Fragment>
    }
    TransitionComponent={Zoom}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://img.medscape.com/thumbnail_library/is_190410_brownies_marijuana_800x450.jpg"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Edibles</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availableEdibles.length} color="primary">
                  <BongIcon  />
                </Badge>
                </Typography>
              </font></b>
              <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Edibles</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          {_.uniqBy(user.availableEdibles, edibles => edibles.strain)
            .map(edibles => ({
              strain: edibles.strain,
              count: user.availableEdibles.filter(
                aedibles => aedibles.strain === edibles.strain
              ).length
            }))
            .map(edibles => (
              <Link
                component={Link1} 
                to={'/seeds/' + seedLinkNames[edibles.strain]}
                variant="body2"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
              <p key={edibles.strain}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent={edibles.count} color="primary">
                  <BongIcon />
                </Badge>
                 {seedNames[edibles.strain]}
                {edibles.count !== 1 ? " Brownies" : " Brownie"}</font>
              </p>
              </Link>
            ))}
          </ExpansionPanelDetails>
          </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid><br/>
    <Grid item xs>
    <HtmlTooltip
    title={
    <React.Fragment>
    <Typography color="error" className={classes.font}><u>Available Cannagars</u></Typography>
    <em><a href="/market/seedbank">{"Total amount of bud you own"}</a></em> <b>{"Use bud to create new items!"}</b>
    </React.Fragment>
    }
    TransitionComponent={Zoom}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://greenrushdaily.com/wp-content/uploads/2017/04/cannagar-cigar-made-entirely-cannabis-6.jpg"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Cannagars</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availableCannagars.length} color="primary">
                  <BongIcon  />
                </Badge>
                </Typography>
              </font></b>
              <hr/>
          <ExpansionPanel className={classes.extension}>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
            >
            <Typography className={classes.font}>View Cannagars</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          {_.uniqBy(user.availableCannagars, cannagars => cannagars.buds)
            .map(cannagars => ({
              strain: cannagars.buds,
              count: user.availableCannagars.filter(
                acannagars => acannagars.strain === cannagars.buds
              ).length
            }))
            .map(cannagars => (
              <Link
                component={Link1} 
                to={'/seeds/' + seedLinkNames[cannagars.buds]}
                variant="body2"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
              <p key={cannagars.buds}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent={cannagars.count} color="primary">
                  <BongIcon />
                </Badge>
                 {seedNames[cannagars.buds]}
                {cannagars.count !== 1 ? " Buds" : " Bud"}</font>
              </p>
              </Link>
            ))}
          </ExpansionPanelDetails>
          </ExpansionPanel>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>

    </TabPanel>

    <TabPanel value={value} index={4} dir={theme.direction}>
<Grid container spacing={2}>
    <Grid item xs>
    <HtmlTooltip
    title={
    <React.Fragment>
    <Typography color="error" className={classes.font}><u>Available Kiefboxes</u></Typography>
    <em><a href="/market/seedbank">{"Total number of available seeds you own"}</a></em> <b>{"Plant them on an extra plot or trade them above!"}</b>
    </React.Fragment>
    }
    TransitionComponent={Zoom}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://cdn.shopify.com/s/files/1/0222/9784/products/Ryot-Pollen-Box-Dark_2048x2048.jpg?v=1571438782"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Kiefboxes</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availableKiefbox} color="primary">
                  <SeedSvgIcon  />
                </Badge>
                </Typography>
              </font></b>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    <Grid item xs>
    <HtmlTooltip
    title={
    <React.Fragment>
    <Typography color="error" className={classes.font}><u>Available Papers</u></Typography>
    <em><a href="/market/seedbank">{"Total amount of pollen you own"}</a></em> <b>{"Use Pollen to create hybrids!"}</b>
    </React.Fragment>
    }
    TransitionComponent={Zoom}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://cdn.shopify.com/s/files/1/1971/3159/products/RawPapers-Classic-SingleWide-Papers-50Leaves_2000x.jpg?v=1522196756"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Papers</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availablePapers} color="primary">
                  <DnaIcon  />
                </Badge>
                </Typography>
              </font></b>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    </Grid>
    <br/>
    <Grid item xs>
    <HtmlTooltip
    title={
    <React.Fragment>
    <Typography color="error" className={classes.font}><u>Available Vacuum Ovens</u></Typography>
    <em><a href="/market/seedbank">{"Total amount of bud you own"}</a></em> <b>{"Use bud to create new items!"}</b>
    </React.Fragment>
    }
    TransitionComponent={Zoom}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://images-na.ssl-images-amazon.com/images/I/71dbflJ6aqL._AC_SY450_.jpg"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Vacuum Ovens</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availableVacovens} color="primary">
                  <BongIcon  />
                </Badge>
                </Typography>
              </font></b>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid><br/>
    <Grid item xs>
    <HtmlTooltip
    title={
    <React.Fragment>
    <Typography color="error" className={classes.font}><u>Available Brownie Mix</u></Typography>
    <em><a href="/market/seedbank">{"Total amount of bud you own"}</a></em> <b>{"Use bud to create new items!"}</b>
    </React.Fragment>
    }
    TransitionComponent={Zoom}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://webstockreview.net/images/baking-clipart-baking-brownie.jpg"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Brownie Mix</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availableBrownieMix} color="primary">
                  <BongIcon  />
                </Badge>
                </Typography>
              </font></b>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid><br/>
    <Grid item xs>
    <HtmlTooltip
    title={
    <React.Fragment>
    <Typography color="error" className={classes.font}><u>Available Hempwraps</u></Typography>
    <em><a href="/market/seedbank">{"Total amount of bud you own"}</a></em> <b>{"Use bud to create new items!"}</b>
    </React.Fragment>
    }
    TransitionComponent={Zoom}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://purplerosesupply.com/wp-content/uploads/2019/03/shell_3.jpg"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Hempwraps</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availableHempwraps} color="primary">
                  <BongIcon  />
                </Badge>
                </Typography>
              </font></b>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>

    <br/>
    <Grid item xs>
    <HtmlTooltip
    title={
    <React.Fragment>
    <Typography color="error" className={classes.font}><u>Available Bluntwraps</u></Typography>
    <em><a href="/market/seedbank">{"Total amount of bud you own"}</a></em> <b>{"Use bud to create new items!"}</b>
    </React.Fragment>
    }
    TransitionComponent={Zoom}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://cdn.shopify.com/s/files/1/1602/7403/products/SBL0010_530x.jpg?v=1489083106"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Bluntwraps</font>
          </Typography>
          <b><font color="B28D43" className={classes.font}>
                <Typography gutterBottom variant="p" component="p">
                <font color="DFB17B" className={classes.font}>Total: </font>
                <Badge className={classes.margin} badgeContent={user.availableBluntwraps} color="primary">
                  <BongIcon  />
                </Badge>
                </Typography>
              </font></b>
        </CardContent>
      </Card>
      </HtmlTooltip>
    </Grid>
    </TabPanel>

      </SwipeableViews>
    </div>
  );
}
