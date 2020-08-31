import React, { Component } from 'react';
import CookieConsent from "react-cookie-consent";

export class AppFooter extends Component {
    render() {
        return  (
            <div className="layout-footer">
                <CookieConsent
                    location="bottom"
                    style={{ background: "#2B373B" }}
                    >
                        <span style={{ fontSize: "10px" }}>
                        This website uses cookies to enhance the user experience.{" "}
                        <br/>
                        Your private, active and owner keys are NOT being stored  Private posting and memo 
                        keys are being cached (encrypted) and they are only readable from the 
                        client (your browser) on this site. 
                        </span>
                </CookieConsent>
            </div>
        );
    }
}