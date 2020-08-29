import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
  media: {
    height: 350,
    width: 515,
  },
}));

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogContent dividers>
        <Grid item xs>
          <a href="https://steempeak.com/contestsupportfund/@hashkings/7-days-of-giveaways" target="_blank">
    <CardMedia
      className={classes.media}
      image="https://i.imgur.com/8mXk8ka.png"
      title="Click here to learn about our giveaways"
    /></a>
    {/*<iframe width="560" 
    height="315" 
    src="https://www.youtube.com/embed/Tvc8WKlf3mc?autoplay=1" 
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
    allowfullScreen>
    </iframe>*/}
  </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}