import React, {useState} from "react";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {gardenNames} from "../service/HashkingsAPI";
import useSteemKeychain from "../hooks/useSteemKeychain";
import {sign} from "steemconnect";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
  font: {
    fontFamily: '"Jua", sans-serif',
  },
}));

export default function BuyGarden({
  username,
  updateDelegation,
  delegation,
  landSupply
}) {
  const [garden, setGarden] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSteemKeychain = useSteemKeychain();

  const classes = useStyles();
  
  const handleSubmit = async e => {
    e.preventDefault();
    if (garden) {
      setIsSubmitting(true);
      const memo = `${garden.id} manage`;
      const amount = "0.500";
      const currency = "STEEM";
      const to = "hashkings";

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
          updateDelegation({
            used: delegation.used + 1,
            available: delegation.available - 1
          });
          setIsSubmitting(false);
          setGarden();
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
            ? `${process.env.REACT_APP_URL}/market/farmplots`
            : "http://localhost:3000/market/farmplots"
        );
      }
    }
  };

  return (
    <>
    <Paper className={classes.paper}>
      <p>
        <b><Typography paragraph><font color="DFB17B" className={classes.font}>
            Plot Credits Available: <br/><br/><b>({delegation.available})</b>
            {delegation.available === 1 ? "s" : ""}</font></Typography>
        </b>
      </p>
      <div className="p-col-12 p-md-12">
        <Dropdown
          optionLabel="name"
          value={garden}
          id="name"
          options={Object.keys(gardenNames).map(key => {
            let name = gardenNames[key];
            if (landSupply) {
              name = `${name} - ${landSupply[key] - landSupply[`${key}c`]}/${
                landSupply[key]
              } left`;
            }
            return {
              id: key,
              name
            };
          })}
          style={{width: "100%"}}
          onChange={e => {
            setGarden(e.value);
          }}
          placeholder="Choose a region..."
        />
      </div>
      <div className="p-col-12 p-md-4">
        <Button
          disabled={isSubmitting}
          label={isSubmitting ? "Purchasing" : "Pay Lease"}
          onClick={handleSubmit}
        />
      </div>
      </Paper>
    </>
  );
}
