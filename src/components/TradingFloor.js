import React, {useContext, useState} from "react";
import PropTypes from 'prop-types';
import {StateContext} from "../App";
import { Redirect } from 'react-router';
import SwipeableViews from 'react-swipeable-views';
import {seedTypes} from '../service/HashkingsAPI';
import {sign} from "steemconnect";
import useSteemKeychain from "../hooks/useSteemKeychain"; 
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Parallax } from 'react-parallax';
import WelcomeCard from "./WelcomeCard";
import { MarketPlots } from "./MarketPlotsDesktop";
import Divider from '@material-ui/core/Divider';

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
    width: "auto",
    flexGrow: 1,
  },
  font: {
    fontFamily: '"Jua", sans-serif',
    color: "#DFB17B"
  },
  fontDark: {
    fontFamily: '"Jua", sans-serif',
    color: "#000000"
  },
  background: {
    backgroundColor: "#DFB17B",
  },
  divider: {
    color: "#000000",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(0),
    backgroundColor: "transparent",
  },
  paperWhite: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(3),
    backgroundColor: "#ffffff",
  },
  media: {
    height: 140,
    maxWidth: 120,
  },
  mediaSteemOG: {
    height: 140,
    maxWidth: 140,
  },
  mediaPlots: {
    height: 200,
  },
  magicalMedia: {
    height: 370,
  },
  card: {
    maxWidth: "auto",
    backgroundColor: "#154A4A",
  },
  cardDark: {
    maxWidth: "auto",
    backgroundColor: "#191A1C",
  },
}));

// The use of React.forwardRef will no longer be required for react-router-dom v6.
// See https://github.com/ReactTraining/react-router/issues/6056
const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

export default function TradingFloor() {
  const classes = useStyles();
  const {username} = useContext(StateContext);
  const theme = useTheme();
  const [tool, setTool] = useState();
  const [value, setValue] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSteemKeychain = useSteemKeychain();
  const seedBackground = "https://allhdwallpapers.com/wp-content/uploads/2018/12/beautiful-weed-plants.jpeg";

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

      const memo = `papers`;
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
          setTool();
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
            : "http://localhost:3000/markets"
        );
      }
    }
  };

  const handleBluntSubmit = async e => {
    e.preventDefault();
    if (username) {
      setIsSubmitting(true);

      const memo = `bluntwraps`;
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
          setTool();
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
            : "http://localhost:3000/markets"
        );
      }
    }
  };

  const handleKiefSubmit = async e => {
    e.preventDefault();
    if (username) {
      setIsSubmitting(true);

      const memo = `kiefbox`;
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
          setTool();
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
            : "http://localhost:3000/markets"
        );
      }
    }
  };  

  const handleHempSubmit = async e => {
    e.preventDefault();
    if (username) {
      setIsSubmitting(true);

      const memo = `hempwraps`;
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
          setTool();
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
            : "http://localhost:3000/markets"
        );
      }
    }
  };  

  const handleVacSubmit = async e => {
    e.preventDefault();
    if (username) {
      setIsSubmitting(true);

      const memo = `vacoven`;
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
          setTool();
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
            : "http://localhost:3000/markets"
        );
      }
    }
  };  

  const handleWrapsSubmit = async k => {
    k.preventDefault();
    if (username) {
      setIsSubmitting(true);

      const memo = `hempwraps`;
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
          setTool();
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
            : "http://localhost:3000/markets"
        );
      }
    }
  };  

  if (username) {
  return (
    <div className={classes.root}>
      <WelcomeCard />
     
      <AppBar position="static" color="#2597C0" className={classes.background}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          aria-label="full width tabs"
        >
          <Tab className={classes.fontDark} label="Hashkings Signature Strains" {...a11yProps(0)} />
          <Tab className={classes.fontDark} label="Hybrid Strains" {...a11yProps(1)} disabled />
          <Tab className={classes.fontDark} label="Farm Plots" {...a11yProps(2)} />
          <Tab className={classes.fontDark} label="Services" {...a11yProps(3)} disabled/>
          <Tab className={classes.fontDark} label="Tools" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
        <div className={classes.root}>
      <Grid container spacing={3}>
      <Grid item xs={3}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.mediaSteemOG}
          image="https://i.imgur.com/ymrzJc9.png"
          title="Lashkar Gah"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Steem OG
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          Steem OG is a hybrid created by @jonyoudyer, founder of @canna-curate in Central California.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/seeds/steem-og" color="error">
          Seeds
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={3}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/vj68ESn.png"
          title="Hindu Kush"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Hindu Kush
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          Hindu Kush is a pure indica strain named after the mountain range stretching 500 miles 
          between Pakistan and Afghanistan where it originated. The harsh climate of its homeland has 
          conditioned this strain to express a thick, protective coat of crystal trichomes 
          cherished by hash makers worldwide. 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/seeds/hindu-kush" color="error">
          Seeds
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={3}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/AQLYmBp.png"
          title="Lashkar Gah"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Lashkar Gah
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          Lashkar Gah is an indica landrace strain named after its geographic origin in south Afghanistan. 
          Like other Afghani indicas, Lashkar Gah is consistent in its delivery of powerful, sedating effects 
          that promote rest and relaxation. Pain, insomnia, and other severe symptoms collapse under the 
          weight of Lashkar Gah’s heavy effects, and a quick examination of its resin-caked buds explains this 
          indica’s potency.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/seeds/lashkar-gah" color="error">
          Seeds
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={3}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/DemC3fz.png"
          title="Afghani"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Afghani
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          Afghani is a heavy indica strain named after its geographic origin, where the earliest 
          varieties of cannabis are believed to have grown. Breeders worldwide have come to treasure 
          Afghani for its heavy resin production which is passed on genetically. 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/seeds/afghani" color="error">
          Seeds
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={3}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/lE9RG6a.png"
          title="Mazar i Sharif"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Mazar i Sharif
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          A legendary strain grown in the far north of Afghanistan.  In fertile and well-irrigated 
          soils these vigorous giants are capable of reaching 4 metres in height or more, and will 
          produce a similarly immense yield of intensely resinous flowers.  Over-indulgence produces 
          a mind-warping, immobilising and narcotic effect. 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/seeds/mazar-i-sharif" color="error">
          Seeds
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={3}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/ROMpyHo.png"
          title="Lambs Bread"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
            Lambs Bread
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          Also called "Lamb's Breath," Lamb's Bread is a bright green and sticky sativa strain. 
          The effects have been known to give mass amounts of energy and positive introspection. 
          Stress subsides quickly from the Lamb's Bread buzz, which can help ease depression. 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/seeds/lambs-bread" color="error">
          Seeds
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={3}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/4pIKcn5.png"
          title="Durban Poison"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Durban Poison
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          This pure sativa originates from the South African port city of Durban. 
          It has gained popularity worldwide for its sweet smell and energetic, uplifting effects. 
          Durban Poison is the perfect strain to help you stay productive through a busy day, 
          when exploring the outdoors, or to lend a spark of creativity.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/seeds/durban-poison" color="error">
          Seeds
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={3}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/iAgZUb9.png"
          title="Acapulco Gold"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Acapulco Gold
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          One of the most well-known strains, Acapulco Gold has been likened to dinner at a five-star 
          restaurant. This strain comes from the area in and around Acapulco, Mexico, and its orange hairs 
          resemble a gold nugget, with gold, green, and brown colors and plenty of resin on the buds. 
          An aroma of burnt toffee lingers when the bud is broken up.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/seeds/acapulco-gold" color="error">
          Seeds
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={3}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/dhADHWe.png"
          title="Kilimanjaro"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Kilimanjaro
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          Kilimanjaro is a pure sativa landrace from the mountain slopes of Tanzania, where it was 
          originally cultivated for use in hunting and religious practice by the native population. 
          Tribes commonly referred to this strain as the “elephant stomper” and utilized it for its 
          energetic, hyper effects. 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/seeds/kilimanjaro" color="error">
          Seeds
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={3}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/jK7rTvI.png"
          title="King's Bread"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          King's Bread
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          Said to be a sativa landrace from the Blue Mountains of Jamaica, King’s Bread (or King’s Breath)
           delivers mellowing and euphoric cerebral effects. Finger-like bulbs reach out from the 
           citrus-scented buds wrapped in crystal trichomes. Lamb’s Bread is counted among its progeny, 
           although King’s Bread’s lineage is not well documented. 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/seeds/kings-bread" color="error">
          Seeds
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={3}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/10sgzUu.png"
          title="Malawi"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Malawi
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          Malawi is a pure sativa strain that comes from the Salima region of Malawi in southeast Africa.
          This strain has an extremely long flowering time, sometimes up to 120 days.  Always worth the 
          wait, Malawi produces long and resin-coated buds, a great smoke for any occasion.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/seeds/malawi" color="error">
          Seeds
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={3}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/WLgOk7w.png"
          title="Swazi Gold"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Swazi Gold
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          Swazi Gold is a sativa landrace strain from Africa known for its sweet, citrus flavor and 
          fast-acting effects. Designed to withstand the harsh conditions of its mountainous homeland, 
          Swazi Gold grows with ease and resilience, although growers will have to wait anywhere from 55 
          to 85 days for plants to finish flowering.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/seeds/swazi-gold" color="error">
          Seeds
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={3}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/OJTlSOo.png"
          title="Chocolate Thai"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Chocolate Thai
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          A legendary landrace strain from Thailand, Chocolate Thai first made an appearance in the U.S. 
          sometime in the 1960s as “Thai sticks,” spindly flowers tied to a bamboo stick that were 
          renowned for their potent high. Old school heads remember these buds as slender and airy, 
          medium-to-dark brown in color, and possessing a unique chocolate-coffee aroma. 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/seeds/chocolate-thai" color="error">
          Seeds
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={3}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/zQGFJNt.png"
          title="Colombian Gold"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Colombian Gold
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
            Colombian Gold is a classic landrace sativa that originated in the Santa Marta mountains of 
            Colombia. Its buds are fluffy and crystal-covered, radiating skunky, sweet notes of lemon and lime. 
            This indigenous sativa parented the famous Skunk #1, a hybrid that has become a staple of cannabis 
            breeding. 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/seeds/colombian-gold" color="error">
          Seeds
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={3}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/envmBIb.png"
          title="Aceh"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Aceh
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          Aceh, also called Atjeh, refers to the sativa varieties of cannabis that come from the Aceh 
          region of Indonesia. These sativas typically grow tall and thin, and are considered the finest 
          among Indonesia’s landrace varieties
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/seeds/aceh" color="error">
          Seeds
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={3}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/BZdquR9.png"
          title="Panama Red"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Panama Red
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          Panama Red is best described as an old-school cannabis classic. Originating from Panama, 
          this pure sativa rose to stardom in the late 1960’s thanks to its speedy and intense effects, 
          bordering on psychedelic. As cannabis cultivation matured, Panama Red, which has a lengthy 
          flowering time of at least 11 weeks, was left behind for faster growing strains and increased 
          profits.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/seeds/panama-red" color="error">
          Seeds
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={3}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/JjWxRe8.png"
          title="Thai"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Thai
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          Thai refers to a cannabis variety that grows natively in Thailand and was brought to the U.S. 
          in the 70s and 80s. This pure sativa landrace is sometimes called “Thai Sticks” because of the 
          way its buds are traditionally dried and tied into long sticks. This original Thai variety has 
          given rise to many strains we commonly see on the market today, including Voodoo, Juicy Fruit, 
          and the classic Haze.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/seeds/thai" color="error">
        Seeds
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        </Grid>
    </div>
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
        <div className={classes.root}>
        <MarketPlots />
        <Grid container spacing={1}>
        <Grid item xs={4}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.mediaPlots}
          image="https://i.imgur.com/ZUyNK5H.png"
          title="Afghanistan"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Afghanistan
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          Many growers believe the earliest cannabis strains sprouted in the Hindu Kush region of 
          Afghanistan and Pakistan and eventually spread to other areas. We call these indigenous 
          strains landraces.
          </Typography>
          <br/>
          <Typography variant="body3" color="textSecondary" component="p" className={classes.font}>
          Bailey Rahn - January 30, 2014
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/plots/afghanistan" color="error">
          Lease Here
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={4}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.mediaPlots}
          image="https://i.imgur.com/tc52N5W.png"
          title="Africa"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Africa
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          HARARE, Zimbabwe (AP) — Zimbabwe has legalized the production of marijuana for medicinal and scientific purposes, making it the rare African country to turn the drug into a source of revenue.
          A government notice issued by the health minister says individuals and corporations can apply for licenses to grow marijuana, whose production and possession had brought up to 12 years in prison.
          Recreational use remains illegal. 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/plots/africa" color="error">
          Lease Here
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={4}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.mediaPlots}
          image="https://i.imgur.com/MCnWKee.png"
          title="Asia"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Asia
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          BANGKOK (AP) — Thailand’s legislature has officially proposed allowing the licensed medical 
          use of marijuana, making it a potential trailblazer in Asia in legalizing what used to be 
          regarded strictly as a dangerous drug.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/plots/asia" color="error">
          Lease Here
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={4}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.mediaPlots}
          image="https://i.imgur.com/i1dSLCf.png"
          title="Central America"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Central America
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          Central American refers to the indigenous varieties of cannabis (or landraces) that grow 
          natively in this region of the world. Because of this region's latitude and climate, these
          native landrace strains tend to be sativa in structure and effect.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/plots/central-america" color="error">
          Lease Here
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={4}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.mediaPlots}
          image="https://i.imgur.com/4wjvHLj.png"
          title="Jamaica"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Jamaica
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          India’s influence on cannabis in Jamaica is also evident in common phrasing. 
          “Ganja,” the preferred moniker for cannabis, is a Hindi word passed down from 
          Sanskrit – “gāñjā” means “hemp” or “hemp resin.”
          </Typography>
          <br/>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          Cannabis quickly became a mainstay in Jamaica, particularly among the lower, 
          working classes of society. It was common in the rural countryside and in the poor, 
          black districts of larger towns. Despite this widespread usage, the Jamaican government 
          quickly outlawed the herb with the Ganja Law of 1913, led by plantation owners who tried 
          to ply workers with rum (which they could profit from), but in spite of these efforts, 
          the love of the leaf was growing.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/plots/jamaica" color="error">
          Lease Here
        </Link>
        </Button>
      </CardActions>
      </Card>
        </Grid>
        <Grid item xs={4}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.mediaPlots}
          image="https://i.imgur.com/pNI9khY.png"
          title="Mexico"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
          Mexico
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          n a legal Mexican cannabis economy, Nieto might be a prized artisan grower, perhaps even 
          a wealthy one. In March, his Zamaldelica strain, a heady Sativa with a healthy dose of 
          cannabidiol (CBD), won top prize in a rare Mexican cannabis cup, sponsored in Guadalajara 
          by the Spanish company Ace Seeds.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <Link component={Link1} to="/plots/mexico" color="error">
        Lease Here
        </Link>
        </Button>
      </CardActions>
    </Card>
        </Grid>
        </Grid>
        </div>
        </TabPanel>

        <TabPanel value={value} index={3} dir={theme.direction}>
        <div className={classes.root}>
        <Card className={classes.cardDark}>
      <CardActionArea disabled>
        <CardMedia
          className={classes.magicalMedia}
          image="https://i.imgur.com/VZdLKOj.png"
          title="Automagical Services"
        />
        <CardContent>
          <hr/>
          <br/>
          <Typography gutterBottom variant="h4" component="h2" className={classes.font}>
          Automatic Watering (Irrigation)
          </Typography>
          <Typography variant="body3" color="textSecondary" component="p" className={classes.font}>
          Brought to you by ecoinstant.net
          </Typography>
          <br/>
          <Typography variant="body1" color="textSecondary" component="p" className={classes.font}>
          If you are going on vacation or don't have time to water your plants regularly, check out 
          the automatic watering system developed by Automagical Services.
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          For more information please visit their latest blog post at <b><a href="https://steempeak.com/hashkings/@ecoinstant/automated-operation-episode-2-watering-your-hashkings-plots">Steampeak.com 
            </a></b>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="large" color="error">
      <a href="https://ecoinstats.net" target="_blank" rel="noreferrer">
          Get Started
        </a>
        </Button>
        <Button size="large" color="error">
      <a href="https://steempeak.com/hashkings/@ecoinstant/automated-operation-episode-2-watering-your-hashkings-plots" target="_blank" rel="noreferrer">
          Learn More
        </a>
        </Button>
      </CardActions>
    </Card>
        </div>
        </TabPanel>

        <TabPanel value={value} index={4} dir={theme.direction}>
        <div className={classes.root}>
        <Card className={classes.cardDark}>
      <CardActionArea disabled>
        <CardMedia
          className={classes.magicalMedia}
          image="https://allhdwallpapers.com/wp-content/uploads/2018/12/beautiful-weed-plants.jpeg"
          title="Farm Tools"
        />
        <CardContent>
          <hr/>
          <br/>
          <Typography gutterBottom variant="h4" component="h2" className={classes.font}>
           Farm Tools
          </Typography>
          <br/>
          <Typography variant="body1" color="textSecondary" component="p" className={classes.font}>
          Need some tool to craft? We have you covered from papers for joints to vac ovens for hash oil!  
          </Typography>
          <br/>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          <b>Choose below! Each item costs 5 STEEM</b>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container spacing={1}>
          <Grid xs>
      <Button size="large" color="error" onClick={handleSubmit}>
          <font color="white">Purchase Papers</font>
        </Button>
        </Grid>
        <Grid xs>
        <Button size="large" color="error" onClick={handleBluntSubmit}>
        <font color="white">Purchase Bluntwraps</font>
        </Button>
        </Grid>
        <Grid xs>
        <Button size="large" color="error" onClick={handleKiefSubmit}>
        <font color="white">Purchase Kiefbox</font>
        </Button>
        </Grid>
        <Grid xs>
        <Button size="large" color="error" onClick={handleHempSubmit}>
        <font color="white">Purchase Hempwraps</font>
        </Button>
        </Grid>
        <Grid xs>
        <Button size="large" color="error" onClick={handleVacSubmit}>
        <font color="white">Purchase Vac Oven</font>
        </Button>
        </Grid>
        </Grid>
      </CardActions>
    </Card>
        </div>
        </TabPanel>
    </div>
  );
} else {
  return (
    <Redirect to='/login'/>
    );
  }
}