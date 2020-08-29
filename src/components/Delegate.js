import React, {useState} from "react";
import {Button} from "primereact/button";
import {Spinner} from "primereact/spinner";
import {sign} from "steemconnect";
import { makeStyles } from '@material-ui/core/styles';
import useSteemKeychain from "../hooks/useSteemKeychain";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "transparent",
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  font: {
    fontFamily: '"Jua", sans-serif',
    color: "#DFB17B",
  },
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 250,
  },
}));

function createData(item, value) {
  return { item, value };
}

export default function Delegate({username, delegation, updateDelegation}) {
  const [amount, setAmount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSteemKeychain = useSteemKeychain();
  
  const classes = useStyles();

  const totalPlots = delegation.used + delegation.available;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const delegatee = "hashkings";
    const newAmount = totalPlots + amount;
    const amountStr = (20 * newAmount).toString() + ".000";
    const unit = "SP";

    if (hasSteemKeychain()) {
      const steem_keychain = window.steem_keychain;
      try {
        await new Promise((resolve, reject) => {
          return steem_keychain.requestDelegation(
            username,
            delegatee,
            amountStr,
            unit,
            response => {
              if (response.success) {
                resolve(response);
              } else {
                reject();
              }
            }
          );
        });
        updateDelegation({
          ...delegation,
          available: delegation.available + amount
        });
        setIsSubmitting(false);
      } catch {
        setIsSubmitting(false);
      }
    } else {
      window.location.href = sign(
        "delegateVestingShares",
        {
          delegator: username,
          delegatee,
          vesting_shares: `${amountStr} ${unit}`
        },
        process.env.REACT_APP_URL
          ? `${process.env.REACT_APP_URL}/market/farmplots`
          : "http://localhost:3000/market/farmplots"
      );
    }
  };

  const rows = [
    createData('Total Plot Credits', totalPlots),
    createData('Plot Credits Used', delegation.used),
    createData('Plot Credits Available', delegation.available),
  ];

  return (
    <div>
      <Paper className={classes.paper}>
      <Table className={classes.table}>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.item}>
              <TableCell align="left" className={classes.font}>{row.item}</TableCell>
              <TableCell align="left" className={classes.font}>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br/><br/>
      
      <Typography heading className={classes.font}>Choose number of extra plot credits you would like.</Typography>
      
      <hr/>
      <div className="p-col-12 p-md-4">
        <Spinner value={amount} onChange={e => setAmount(e.value)} min={1} />
      </div>
      <div className="p-col-12 p-md-4">
        <Button
          disabled={isSubmitting}
          label={isSubmitting ? "Delegating" : "Delegate"}
          onClick={handleSubmit}
          className={classes.font}
        />
      </div>
      <br/>
      </Paper>
    </div>
  );
}
