import React, { useContext, useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { HashkingsAPI } from "../service/HashkingsAPI";
import { StateContext } from "../App";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { Redirect } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import { EconomyDashboard } from './EconomyDashboard';

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  extension: {
    backgroundColor: "#095938",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#154A4A",
  },
  paperBlack: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#000000",
  },
}));

export default function() {
  const classes = useStyles();
  const { username } = useContext(StateContext);
  const payoutsTable = useRef(null);
  const landPurchasesTable = useRef(null);
  const seedPurchasesTable = useRef(null);

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

  const [gardens, setGardens] = useState([]);
  const [recentPayouts, setRecentPayouts] = useState([]);
  const [recentLandPurchases, setRecentLandPurchases] = useState([]);
  const [recentSeedPurchases, setRecentSeedPurchases] = useState([]);
  const [oldestId, setOldestId] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [noMoreHistory, setNoMoreHistory] = useState(false);
  const [steemPerVest, setSteemPerVest] = useState(0);
  const [fetchAll, setFetchAll] = useState(false);

  const [oldestDate, setOldestDate] = useState(
    new Date(Date.now()).toDateString()
  );

  const hashkingsApi = new HashkingsAPI();

  useEffect(() => {
    if (username) {
      setLoading(true);
      hashkingsApi.getDGPO().then(dgpo => {
        const spv =
          parseFloat(dgpo.total_vesting_fund_steem.split(" ")[0]) /
          parseFloat(dgpo.total_vesting_shares.split(" ")[0]);

        setSteemPerVest(spv);

        Promise.all([
          hashkingsApi
            .getAccountHistory(spv, username, false)
            .then(
              ({
                payouts,
                oldestId,
                stop,
                date,
                landPurchases,
                seedPurchases
              }) => {
                setOldestId(oldestId);
                setRecentPayouts(payouts);
                setRecentLandPurchases(landPurchases);
                setRecentSeedPurchases(seedPurchases);

                if (stop) {
                  setNoMoreHistory(true);
                }

                if (date) {
                  setOldestDate(date);
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

  function blockTemplate(data) {
    const trx_id = data.trx_id || "0000000000000000000000000000000000000000";

    return (
      <a href={`https://steemd.com/b/${data.block}#${trx_id}`}>{data.block}</a>
    );
  }

  function fetchMore() {
    setLoading(true);
    hashkingsApi
      .getAccountHistory(steemPerVest, username, fetchAll, oldestId)
      .then(
        ({ payouts, oldestId, stop, date, landPurchases, seedPurchases }) => {
          setOldestId(oldestId);
          setRecentPayouts([...recentPayouts, ...payouts]);
          setRecentLandPurchases([...recentLandPurchases, ...landPurchases]);
          setRecentSeedPurchases([...recentSeedPurchases, ...seedPurchases]);

          if (stop) {
            setNoMoreHistory(true);
          }

          if (date) {
            setOldestDate(date);
          }

          setLoading(false);
        }
      )
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  }

  if (!username) {
    return (
    <Redirect to='/login'/>
    );
  } else {
    return (
      <Paper className={classes.paperBlack}>
        <EconomyDashboard />
          <Paper className={classes.paper}>
            <br />
            <center><h1>
              <b><font color="DFB17B"><u>Payouts and Purchases</u></font></b>
            </h1>
            <p><font color="DFB17B">Since {oldestDate}{" "}</font></p>
            </center>
          </Paper>
          <br/>
            <div className={classes.heading}>
            <Paper className={classes.paper}>
              <ExpansionPanel className={classes.extension}>
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                  <Typography className={classes.heading}><font color="DFB17B">Payouts</font></Typography>
                  </ExpansionPanelSummary>
                  <Button
                  className="export-stats"
                  disabled={loading}
                  label="Export as CSV"
                  onClick={() => payoutsTable.current.exportCSV()}
                />
                  <ExpansionPanelDetails>
              <DataTable
                value={recentPayouts}
                loading={loading}
                responsive={true}
                emptyMessage="No payouts found"
                ref={payoutsTable}
              >
                <Column field="timestamp" header="Date" sortable={true} />
                <Column
                  field="sp_payout"
                  header="STEEM Power Payout"
                  sortable={true}
                />
                <Column
                  field="sbd_payout"
                  header="SBD Payout"
                  sortable={true}
                />
                <Column
                  field="steem_payout"
                  header="STEEM Payout"
                  sortable={true}
                />
                <Column
                  field="block"
                  header="Block"
                  sortable={true}
                  body={blockTemplate}
                />
              </DataTable>
              </ExpansionPanelDetails>
      </ExpansionPanel>
      </Paper>
              <br/>
              <Paper className={classes.paper}>
              <ExpansionPanel className={classes.extension}>
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                  <Typography className={classes.heading}><font color="DFB17B">Plot Purchases</font></Typography>
                  </ExpansionPanelSummary>
                <Button
                  className="export-stats"
                  disabled={loading}
                  label="Export as CSV"
                  onClick={() => landPurchasesTable.current.exportCSV()}
                />
             <ExpansionPanelDetails>
              <DataTable
                value={recentLandPurchases}
                loading={loading}
                emptyMessage="No purchases found"
                responsive={true}
                ref={landPurchasesTable}
              >
                <Column field="timestamp" header="Date" sortable={true} />
                <Column field="region" header="Region" filter={true} />
                <Column field="amount" header="Amount" sortable={true} />
                <Column
                  field="block"
                  header="Block"
                  sortable={true}
                  body={blockTemplate}
                />
              </DataTable>
              </ExpansionPanelDetails>
              </ExpansionPanel>
              </Paper>
              <br/>
              <Paper className={classes.paper}>
              <ExpansionPanel className={classes.extension}>
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                  <Typography className={classes.heading}><font color="DFB17B">Seed Purchases</font></Typography>
                  </ExpansionPanelSummary>
                <Button
                  className="export-stats"
                  disabled={loading}
                  label="Export as CSV"
                  onClick={() => seedPurchasesTable.current.exportCSV()}
                />
                <ExpansionPanelDetails>
              <DataTable
                value={recentSeedPurchases}
                loading={loading}
                emptyMessage="No purchases found"
                responsive={true}
                ref={seedPurchasesTable}
              >
                <Column field="timestamp" header="Date" sortable={true} />
                <Column field="strain" header="Strain" filter={true} />
                <Column field="type" header="Type" filter={true} />
                <Column field="amount" header="Amount" sortable={true} />
                <Column
                  field="block"
                  header="Block"
                  sortable={true}
                  body={blockTemplate}
                />
              </DataTable>
              </ExpansionPanelDetails>
             </ExpansionPanel>
             </Paper>
              <div id="fetch-all-history">
                <Checkbox
                  inputId="fetchAll"
                  onChange={() => setFetchAll(!fetchAll)}
                  checked={fetchAll}
                  disabled={loading || noMoreHistory}
                /><font color="DFB17B">
                <label htmlFor="fetchAll" className="p-checkbox-label">
                  {" "}
                  Load all history (can take a while)
                </label></font>
              </div>
              <Button
                className="load-history"
                disabled={loading || noMoreHistory}
                label={
                  noMoreHistory
                    ? "No more history"
                    : loading
                    ? "Loading More"
                    : "Load More"
                }
                onClick={fetchMore}
              />
            </div>
         
      </Paper>
    );
  }
}
