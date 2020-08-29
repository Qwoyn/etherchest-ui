import React, {useContext, useState, useEffect} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {gardenNames, seedNames} from "../service/HashkingsAPI";
import {MultiSelect} from "primereact/multiselect";
import {StateContext} from "../App";
import {format as formatTimeAgo} from "timeago.js";

export default function HarvestModal({
  isOpen,
  toggleModal,
  activeGardens,
  username,
  headBlockNum
}) {
  const [gardens, setGardens] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {steemConnectAPI} = useContext(StateContext);

  useEffect(() => {
    if (!isOpen) {
      setGardens([]);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const watered = error => {
    if (error) {
      setIsSubmitting(false);
    } else {
      toggleModal();
    }
  };

  const handleSubmit = () => {
    if (username && gardens.length > 0) {
      setIsSubmitting(true);

      const custom_json_id = "qwoyn_harvest";
      const custom_JSON = JSON.stringify({plants: gardens.map(g => g.id)});

      steemConnectAPI.customJson(
        [],
        [username],
        custom_json_id,
        custom_JSON,
        watered
      );
    }
  };

  const harvestGardens = activeGardens.map(garden => {

    var plantSex = garden.sex;

    if(garden.sex == undefined){
      plantSex = 'Not Sexed';
    } else {
      plantSex = garden.sex;
    }

    let name = `${seedNames[garden.strain]} - ${plantSex} || ${gardenNames[garden.id[0]]} - ${garden.id}`;

    const harvestActions = garden.care
      .filter(care => care[1] === "harvested")
      .sort((a, b) => b[0] - a[0]);

      if (garden.stage >= 4) {
        name = `Harvest Now! - ${name}`;
      } else {
      if (harvestActions.length > 0) {
        const date = new Date(Date.now());
        date.setSeconds(
          date.getSeconds() - (headBlockNum - harvestActions[0][0]) * 3
        );
        name = `${name} - Harvested: ${formatTimeAgo(date)}`;
      } else {
        if (garden.stage < 4) {
          name = `Not Ready - ${name}`;
        }
      }
      } 
      return {
        id: garden.id,
        name
      };
    });

  const selectedGardensTemplate = option => {
    if (option) {
      return <span>{`${option.id} `}</span>;
    } else {
      return <span>Choose your farms...</span>;
    }
  };

  return (
    <>
      <Dialog
        header="Harvest your Plants"
        visible={isOpen}
        modal={true}
        style={{width: "50vw", maxWidth: 500}}
        onHide={() => toggleModal("waterModal")}
        closeOnEscape={true}
        dismissableMask={true}
        id="waterModal"
      >
        {activeGardens.length === 0 ? (
          <p>Sorry, you don't have any active plots.</p>
        ) : (
          <>
            <label htmlFor="garden"><b>Choose a plot or plots then click harvest.  Your seeds will be available
              24 hours after harvest!</b></label>
			<br/><br/>
			  <Button
              disabled={isSubmitting}
              label={isSubmitting ? "Harvesting" : "Harvest"}
              onClick={handleSubmit}
              />
			  <br/><br/>
              <MultiSelect
                style={{width: "100%"}}
                optionLabel="name"
                value={gardens}
                options={harvestGardens}
                onChange={e => setGardens(e.value)}
                filter={true}
                selectedItemTemplate={selectedGardensTemplate}
              />
          </>
        )}
      </Dialog>
    </>
  );
}
