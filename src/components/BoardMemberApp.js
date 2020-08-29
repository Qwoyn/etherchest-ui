import React from "react";
import {withRouter} from "react-router-dom";
import Container from '@material-ui/core/Container';

export const BoardMemberApp = () => {

    return (
      <Container fixed>
      <div className="card-blank">
        
        <div className="p-fluid">
        <center>
          <div className="p-col-12">
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfmdz-FmAO5QeojGbFMYv3D47CO1auQt4DW2BBn327zgDf1Ag/viewform?embedded=true" width="640" height="1194" frameborder="0" marginheight="0" marginwidth="0" title="BoardMember App">Loading…</iframe>
          </div>
        </center>
        </div>

	  </div></Container>
    );
};

export default withRouter(BoardMemberApp);