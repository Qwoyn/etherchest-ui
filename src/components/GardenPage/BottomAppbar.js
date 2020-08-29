import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
});

export default function IconTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [plantSeedModal, setPlantSeedModal] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <div>
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        onClick={() => setPlantSeedModal(!plantSeedModal)}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon tabs example"
      >
        <Tab icon={<PhoneIcon />} aria-label="phone" />
        <Tab icon={<FavoriteIcon />} aria-label="favorite" />
        <Tab icon={<PersonPinIcon />} aria-label="person" />
      </Tabs>
    </Paper>
    <PlantModal
    isOpen={plantSeedModal}
    toggleModal={() => setPlantSeedModal(!plantSeedModal)}
    availableGardens={user.availableGardens}
    availableSeeds={user.availableSeeds}
    username={username}
  />
  </div>
  );
}