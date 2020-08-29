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

export default function BluntModal({
  isOpen,
  toggleModal,
  availableBuds,
  totalxps,
  availableBluntwraps,
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
    if (username && bud && availableBluntwraps > 0) {
      setIsSubmitting(true);

      const custom_json_id = "qwoyn_craft_joint";
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
        header="Roll Blunt"
        visible={isOpen}
        modal={true}
        style={{width: "50vw", maxWidth: 500, background: "#000000"}}
        onHide={() => toggleModal("craftBluntModal")}
        closeOnEscape={true}
        dismissableMask={true}
        id="craftBluntModal"
      >
        {totalxps < 2 && (
          <h2><u><b>Locked!</b></u> - You need 5000 XP to unlock and currently have {totalxps} XP .</h2>        )}
        {availableBuds.length === 0 && (
          <h4><b>Do you have any buds?</b></h4>
        )}
        {availableBluntwraps < 1 && <h3>You also need Bluntwraps<br/> 
        <Link component={Link1} to="/markets">Please visit the market.
        </Link>
        </h3>
        }
        {availableBuds.length > 0 && availableBluntwraps > 0 && (
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
              label={isSubmitting ? "Crafting" : "Craft Blunt"}
              onClick={handleSubmit}
            />
          </>
        )}
      </Dialog>
    </>
  );
}
