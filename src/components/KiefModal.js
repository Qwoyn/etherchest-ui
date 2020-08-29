import React, {useContext, useState, useEffect} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {seedNames} from "../service/HashkingsAPI";
import {Dropdown} from "primereact/dropdown";
import _ from "lodash";
import {StateContext} from "../App";

import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

// The use of React.forwardRef will no longer be required for react-router-dom v6.
// See https://github.com/ReactTraining/react-router/issues/6056
const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

export default function KiefModal({
  isOpen,
  toggleModal,
  availableBuds,
  availableKiefbox,
  totalxps,
  username
}) {
  const [bud, setBud] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {steemConnectAPI} = useContext(StateContext);
  useEffect(() => {
    if (!isOpen) {
      setBud();
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const crafted = error => {
    if (error) {
      setIsSubmitting(false);
    } else {
      toggleModal();
    }
  };

  const handleSubmit = () => {
    if (username && bud && availableKiefbox > 0) {
      setIsSubmitting(true);

      const custom_json_id = "qwoyn_craft_kief";
      const custom_JSON = JSON.stringify({
        buds: bud.strain
      });

      steemConnectAPI.customJson(
        [],
        [username],
        custom_json_id,
        custom_JSON,
        crafted
      );
    }
  };

  return (
    <>
      <Dialog
        header="Craft Kief"
        visible={isOpen}
        modal={true}
        style={{width: "50vw", maxWidth: 500, background: "#000000"}}
        onHide={() => toggleModal("craftKiefModal")}
        closeOnEscape={true}
        dismissableMask={true}
        id="craftKiefModal"
      >
        {totalxps < 2 && (
          <h2><u><b>Locked!</b></u> - You need 100 XP to unlock and currently have {totalxps} XP .</h2>        )}
        {availableBuds.length === 0 && (
          <h4><b>Do you have any buds?</b></h4>
        )}
        {availableKiefbox < 1 && <h3>You also need a Kiefbox<br/> 
        <Link component={Link1} to="/markets">Please visit the market.
        </Link>
        </h3>
        }
        {availableBuds.length > 0 && availableKiefbox > 0 && (
          <>
            <label htmlFor="bud">Bud</label>
            <Dropdown
              optionLabel="name"
              value={bud}
              id="bud"
              options={_.uniqBy(availableBuds, bud => bud.strain).map(
                bud => ({
                  ...bud,
                  name: `${seedNames[bud.strain]}`
                })
              )}
              style={{width: "100%"}}
              onChange={e => {
                setBud(e.value);
              }}
              placeholder="Choose a nug..."
            />
            <Button
              disabled={isSubmitting}
              label={isSubmitting ? "Crafting" : "Craft Kief"}
              onClick={handleSubmit}
            />
          </>
        )}
      </Dialog>
    </>
  );
}
