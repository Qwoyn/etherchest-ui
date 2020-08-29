import React, {useContext, useState, useRef, useEffect} from "react";
import {seedNames, HashkingsAPI} from "../../service/HashkingsAPI";
import {StateContext} from "../../App";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {Growl} from "primereact/growl";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import Card from '@material-ui/core/Card';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: '"Jua", sans-serif',
  },
  background: {
    backgroundImage: 'url(https://i.imgur.com/ET4nTp7.jpg)',
    backgroundColor: "#DFB17B",
  },
  font: {
    fontFamily: '"Jua", sans-serif',
    color: '#DFB17B',
  },
  card: {
    backgroundColor: "#144848",
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    margin: 'auto',
    maxWidth: 500,
    backgroundColor: "transparent",
    color: '#DFB17B',
    fontFamily: '"Jua", sans-serif',
  },
    paperTransparent: {
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      whiteSpace: 'wrap',
      marginBottom: theme.spacing(3),
      backgroundColor: "Transparent",
    },
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

const hashkingsApi = new HashkingsAPI();

export default function SeedGifting() {
  const classes = useStyles();
  const {username} = useContext(StateContext);
  const [seed, setSeed] = useState();
  const [buds, setBuds] = useState();
  const [pollen, setPollen] = useState();
  const [to, setTo] = useState("");
  const [validatedTo, setValidatedTo] = useState();
  const [isSubmittingSeeds, setIsSubmittingSeeds] = useState(false);
  const [isSubmittingBuds, setIsSubmittingBuds] = useState(false);
  const [isSubmittingPollen, setIsSubmittingPollen] = useState(false);
  const {steemConnectAPI} = useContext(StateContext);
  const growl = useRef(null);
  const seedBackground = "https://wallpaperaccess.com/full/816276.jpg";

  const [userSeeds, setUserSeeds] = useState([]);
  const [userBuds, setUserBuds] = useState([]);
  const [userPollen, setUserPollen] = useState([]);

  useEffect(() => {
    hashkingsApi.getUserGarden(username).then(garden => {
      setUserSeeds(garden.availableSeeds);
    });
  }, [username]);

  useEffect(() => {
    hashkingsApi.getUserGarden(username).then(garden => {
      setUserPollen(garden.availablePollen);
    });
  }, [username]);

  useEffect(() => {
    hashkingsApi.getUserGarden(username).then(garden => {
      setUserBuds(garden.availableBuds);
    });
  }, [username]);

  const gifted = error => {
    if (error) {
      growl.current.show({
        severity: "error",
        summary: "Sorry, something went wrong",
        detail: "Please try again"
      });
    }
    setIsSubmittingSeeds(false);
    setIsSubmittingBuds(false);
    setIsSubmittingPollen(false);
  };

  useEffect(() => {
    hashkingsApi.steemUserExists(to).then(username => {
      if (username && username === to) {
        setValidatedTo(username);
      } else {
        setValidatedTo();
      }
    });
  }, [to]);

  const handleSubmitSeeds = async () => {
    if (validatedTo && username && seed) {
      setIsSubmittingSeeds(true);

      const custom_json_id = "qwoyn_give_seed";
      const custom_JSON = JSON.stringify({
        to: validatedTo,
        seed: seed.strain,
        qual: seed.xp
      });

      steemConnectAPI.customJson(
        [],
        [username],
        custom_json_id,
        custom_JSON,
        gifted
      );
    }
  };

  const handleSubmitPollen = async () => {
    if (validatedTo && username && pollen) {
      setIsSubmittingPollen(true);

      const custom_json_id = "qwoyn_give_pollen";
      const custom_JSON = JSON.stringify({
        to: validatedTo,
        pollen: pollen.strain,
        qual: pollen.xp
      });

      steemConnectAPI.customJson(
        [],
        [username],
        custom_json_id,
        custom_JSON,
        gifted
      );
    }
  };

  const handleSubmitBuds = async () => {
    if (validatedTo && username && buds) {
      setIsSubmittingBuds(true);

      const custom_json_id = "qwoyn_give_buds";
      const custom_JSON = JSON.stringify({
        to: validatedTo,
        buds: buds.strain,
        qual: buds.xp
      });

      steemConnectAPI.customJson(
        [],
        [username],
        custom_json_id,
        custom_JSON,
        gifted
      );
    }
  };

  let buttonLabel = "Send";
  if (isSubmittingSeeds) buttonLabel = "Sending Seeds";
  if (isSubmittingBuds) buttonLabel = "Sending Buds";
  if (isSubmittingPollen) buttonLabel = "Sending Pollen";
  if (!username) buttonLabel = "Please sign in to send items";

  return (
    <>
      <Growl ref={growl} />
      <Grid container spacing={1}>
      <Grid item xs>
      <Paper className={classes.paper}>
      <Typography gutterBottom variant="h4" component="h4" className={classes.font}>Inventory Exchange</Typography>
      <hr/>
      </Paper>
      </Grid>
        <Grid item xs>
          <HtmlTooltip
          title={
            <React.Fragment>
            <em><a href="/market/seedbank">{"Do you have extra items?"}</a></em><b>{"Enter the recipients username, choose the seed/pollen/buds and click send"}</b>
            </React.Fragment>
          }
          placement="top"
          TransitionComponent={Zoom}
          >
            <Card className={classes.card} raised={true}>
            <form className={classes.root} noValidate autoComplete="off">
            <Paper className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs>
                <Typography>Send a Seed to another Farmer</Typography>
                <br/>
                <TextField id="outlined-basic" 
                  color="secondary"
                  label="Enter Recipient" 
                  variant="filled" 
                  value={to}
                  onChange={f => setTo(f.target.value.trim())}
                  className={classes.font}
                />
                <br/>
              </Grid>
            </Grid>
              <Grid container spacing={1}>
                <Grid item xs>
                  {validatedTo && (
                    <div>
                      <h2>{validatedTo}</h2>
                      <img
                        alt="avatar"
                        src={`https://steemitimages.com/u/${validatedTo}/avatar/small`}
                      />
                    </div>
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs>
                  <Dropdown
                    className="form-input"
                    disabled={isSubmittingSeeds || !username}
                    optionLabel="name"
                    value={seed}
                    id="name"
                    options={userSeeds.map(seed => ({
                      ...seed,
                      name: `${seedNames[seed.strain]} - ${seed.traits}`
                    }))}
                    style={{width: "100%", color: "#ffffff"}}
                    onChange={f => {
                      setSeed(f.value);
                    }}
                    placeholder="Choose a seed..."
                  />
                  <br/>
                  <Button
                    disabled={isSubmittingSeeds || !username || !validatedTo | !seed}
                    label={buttonLabel}
                    onClick={handleSubmitSeeds}
                  />
                </Grid>
              </Grid>
              </Paper>
              </form>
            
            </Card>
        </HtmlTooltip>
     
</Grid>
<Grid item xs>
            <Card className={classes.card} raised={true}>
            <form className={classes.root} noValidate autoComplete="off">
            <Paper className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs>
                <Typography>Send a Bud to another Farmer</Typography>
                <br/>
                <TextField id="outlined-basic" 
                  color="secondary"
                  label="Enter Recipient" 
                  variant="filled" 
                  value={to}
                  onChange={g => setTo(g.target.value.trim())}
                  className={classes.font}
                />
                <br/>
              </Grid>
            </Grid>
              <Grid container spacing={1}>
                <Grid item xs>
                  {validatedTo && (
                    <div>
                      <h2>{validatedTo}</h2>
                      <img
                        alt="avatar"
                        src={`https://steemitimages.com/u/${validatedTo}/avatar/small`}
                      />
                    </div>
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs>
                  <Dropdown
                    className="form-input"
                    disabled={isSubmittingBuds || !username}
                    optionLabel="name"
                    value={buds}
                    id="name"
                    options={userBuds.map(buds => ({
                      ...buds,
                      name: `${seedNames[buds.strain]} - ${buds.traits}`
                    }))}
                    style={{width: "100%", color: "#ffffff"}}
                    onChange={g => {
                      setBuds(g.value);
                    }}
                    placeholder="Choose some bud..."
                  />
                  <br/>
                  <Button
                    disabled={isSubmittingBuds || !username || !validatedTo | !buds}
                    label={buttonLabel}
                    onClick={handleSubmitBuds}
                  />
                </Grid>
              </Grid>
              </Paper>
              </form>
            
            </Card>
     
</Grid>
<Grid item xs>
            <Card className={classes.card} raised={true}>
            <form className={classes.root} noValidate autoComplete="off">
            <Paper className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs>
                <Typography>Send a Pollen to another Farmer</Typography>
                <br/>
                <TextField id="outlined-basic" 
                  color="secondary"
                  label="Enter Recipient" 
                  variant="filled" 
                  value={to}
                  onChange={e => setTo(e.target.value.trim())}
                  className={classes.font}
                />
                <br/>
              </Grid>
            </Grid>
              <Grid container spacing={1}>
                <Grid item xs>
                  {validatedTo && (
                    <div>
                      <h2>{validatedTo}</h2>
                      <img
                        alt="avatar"
                        src={`https://steemitimages.com/u/${validatedTo}/avatar/small`}
                      />
                    </div>
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs>
                  <Dropdown
                    className="form-input"
                    disabled={isSubmittingPollen || !username}
                    optionLabel="name"
                    value={pollen}
                    id="name"
                    options={userPollen.map(pollen => ({
                      ...pollen,
                      name: `${seedNames[pollen.strain]} - ${pollen.traits}`
                    }))}
                    style={{width: "100%", color: "#ffffff"}}
                    onChange={e => {
                      setPollen(e.value);
                    }}
                    placeholder="Choose Pollen..."
                  />
                  <br/>
                  <Button
                    disabled={isSubmittingPollen || !username || !validatedTo | !pollen}
                    label={buttonLabel}
                    onClick={handleSubmitPollen}
                  />
                </Grid>
              </Grid>
              </Paper>
              </form>
            
            </Card>
     
</Grid>
</Grid>
</>
  );
}