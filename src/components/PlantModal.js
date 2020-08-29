import React, {useContext, useState, useEffect} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {gardenNames, seedNames} from "../service/HashkingsAPI";
import {Dropdown} from "primereact/dropdown";
import _ from "lodash";
import {StateContext} from "../App";

export default function PlantModal({
  isOpen,
  toggleModal,
  availableGardens,
  availableSeeds,
  username
}) {
  const [seed, setSeed] = useState();
  const [garden, setGarden] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {steemConnectAPI} = useContext(StateContext);
  useEffect(() => {
    if (!isOpen) {
      setSeed();
      setGarden();
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const planted = error => {
    if (error) {
      setIsSubmitting(false);
    } else {
      toggleModal();
    }
  };

  const handleSubmit = () => {
    if (username && seed && garden) {
      setIsSubmitting(true);

      const custom_json_id = "qwoyn_plant";
      const custom_JSON = JSON.stringify({
        addr: garden.id,  
        seed: seed.strain
      });

      steemConnectAPI.customJson(
        [],
        [username],
        custom_json_id,
        custom_JSON,
        planted
      );
    }
  };

  return (
    <>
      <Dialog
        header="Plant a Seed"
        visible={isOpen}
        modal={true}
        style={{width: "50vw", maxWidth: 500, background: "#000000"}}
        onHide={() => toggleModal("plantSeedModal")}
        closeOnEscape={true}
        dismissableMask={true}
        id="plantSeedModal"
      >
        {availableGardens.length === 0 && (
          <p><b>Sorry, you don't have any available gardens</b></p>
        )}
        {availableSeeds.length === 0 && <p>Sorry, you don't have any seeds. Please visit the seed market.</p>}
        {availableGardens.length > 0 && availableSeeds.length > 0 && (
          <>
            <label htmlFor="seed">Seed</label>
            <Dropdown
              optionLabel="name"
              value={seed}
              id="seed"
              options={_.uniqBy(availableSeeds, seed => seed.strain).map(
                seed => ({
                  ...seed,
                  name: `${seedNames[seed.strain]}`
                })
              )}
              style={{width: "100%"}}
              onChange={e => {
                setSeed(e.value);
              }}
              placeholder="Choose a seed..."
            />
            <label htmlFor="garden">Garden</label>
            <Dropdown
              optionLabel="name"
              id="garden"
              value={garden}
              options={_.uniqBy(availableGardens, garden => garden[0]).map(
                garden => ({id: garden, 
                  name: `${gardenNames[garden[0]]}`
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
              label={isSubmitting ? "Planting" : "Plant"}
              onClick={handleSubmit}
            />
          </>
        )}
      </Dialog>
    </>
  );
}
