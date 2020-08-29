import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  media: {
    height: 400,
    width: 500,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(3),
    backgroundColor: "#095938",
  },
}));

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function PostDialog() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const hideDialog = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogContent dividers>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <a href="https://www.bonfire.com/hashkings-community-shirts/" target="_blank">
            <CardMedia
              className={classes.media}
              //image="https://i.imgur.com/GkgOq4F.png"
              image="https://i.imgur.com/GkgOq4F.png"
            />
            </a>
          </Paper>
        </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}