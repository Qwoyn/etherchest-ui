import React, {useContext, useState, useEffect} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {gardenNames, seedNames, pollenNames} from "../service/HashkingsAPI";
import {Dropdown} from "primereact/dropdown";
import _ from "lodash";
import {StateContext} from "../App";

export default function PollinateModal({
  isOpen,
  toggleModal,
  activeGardens,
  availablePollen,
  username
}) {
  const [pollen, setPollen] = useState();
  const [garden, setGarden] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {steemConnectAPI} = useContext(StateContext);
  useEffect(() => {
    if (!isOpen) {
      setPollen();
      setGarden();
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const pollinated = error => {
    if (error) {
      setIsSubmitting(false);
    } else {
      toggleModal();
    }
  };

  const handleSubmit = () => {
    if (username && pollen && garden) {
      setIsSubmitting(true);

      const custom_json_id = "qwoyn_pollinate";
      const custom_JSON = JSON.stringify({
        plants: garden.id,
        pollen: pollen.strain
      });

      steemConnectAPI.customJson(
        [],
        [username],
        custom_json_id,
        custom_JSON,
        pollinated
      );
    }
  };

  return (
    <>
      <Dialog
        header="Pollinate a plant"
        visible={isOpen}
        modal={true}
        style={{width: "50vw", maxWidth: 500, background: "#000000"}}
        onHide={() => toggleModal("pollinateSeedModal")}
        closeOnEscape={true}
        dismissableMask={true}
        id="pollinationSeedModal"
      >
        {activeGardens.length === 0 && (
          <p><b>Sorry, you don't have any available gardens</b></p>
        )}
        {availablePollen.length === 0 && <p>Sorry, you don't have any pollen. Please visit the pollen market.</p>}
        {activeGardens.length > 0 && availablePollen.length > 0 && (
          <>
            <label htmlFor="pollen">Pollen</label>
            <Dropdown
              optionLabel="name"
              value={pollen}
              id="pollen"
              options={_.uniqBy(availablePollen, pollen => pollen.strain).map(
                pollen => ({
                  ...pollen,
                  name: `${pollenNames[pollen.strain]}`
                })
              )}
              style={{width: "100%"}}
              onChange={e => {
                setPollen(e.value);
              }}
              placeholder="Choose pollen..."
            />
            <label htmlFor="garden">Garden</label>
            <Dropdown
              optionLabel="name"
              id="garden"
              value={garden}
              options={_.uniqBy(activeGardens, garden => garden.id).map(
                garden => ({
                  ...garden,
                  name: `${(garden.stage > 2) ? 'Ready for Pollen' : 'Not Ready for Pollen' } -${(garden.pollinated === true) ? ' Pollinated' : '' } - ${pollenNames[garden.strain]} || ${gardenNames[garden.id[0]]} - ${garden.id}`
                })
              )}
              style={{width: "100%"}}
              onChange={e => {
                setGarden(e.value);
              }}
              placeholder="Choose a plot..."
            />
            <Button
              disabled={isSubmitting}
              label={isSubmitting ? "Pollinating" : "Pollinate"}
              onClick={handleSubmit}
            />
          </>
        )}
      </Dialog>
    </>
  );
}
