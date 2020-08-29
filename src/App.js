import React, {Component} from "react";
import classNames from "classnames";
import {AppTopbar} from "./AppTopbar";
import {AppMenu} from "./AppMenu";
import {Route} from "react-router-dom";
import {Partners} from "./components/Partners";
import {LoginPage} from "./components/LoginPage";
import {GardenPage} from "./components/GardenPage";
import {MarketPlots} from "./components/MarketPlots";
import {MarketSeeds} from "./components/MarketSeeds";
import {MarketSupplies} from "./components/MarketSupplies";
import {ScrollPanel} from "primereact/components/scrollpanel/ScrollPanel";
import {TwitchStreams} from './components/TwitchStreams.js';
import { BoardMemberApp } from "./components/BoardMemberApp";
import { HomePage } from "./components/HomePage";

import { MazariSharif } from "./components/seeds/MazariSharif";
import { PanamaRed } from "./components/seeds/PanamaRed";
import { SwaziGold } from "./components/seeds/SwaziGold";
import { ColombianGold } from "./components/seeds/ColombianGold";
import { Malawi } from "./components/seeds/Malawi";
import { Kilimanjaro } from "./components/seeds/Kilimanjaro";
import { KingsBread } from "./components/seeds/KingsBread";
import { AcapulcoGold } from "./components/seeds/AcapulcoGold";
import { LambsBread } from "./components/seeds/LambsBread";
import { HinduKush } from "./components/seeds/HinduKush";
import { DurbanPoison } from "./components/seeds/DurbanPoison";
import { ChocolateThai } from "./components/seeds/ChocolateThai";
import { Thai } from "./components/seeds/Thai";
import { Afghani } from "./components/seeds/Afghani";
import { LashkarGah } from "./components/seeds/LashkarGah";
import { Aceh } from "./components/seeds/Aceh";
import { SteemOG } from "./components/seeds/SteemOG";

import Afghanistan from './components/seeds/Afghanistan';
import Africa from './components/seeds/Africa';
import Jamaica from './components/seeds/Jamaica';
import CentralAmerica from './components/seeds/CentralAmerica';
import Asia from './components/seeds/Asia';
import Mexico from './components/seeds/Mexico';

import { MazariSharifpollen } from "./components/seeds/MazariSharifpollen";
import { PanamaRedpollen } from "./components/seeds/PanamaRedpollen";
import { SwaziGoldpollen } from "./components/seeds/SwaziGoldpollen";
import { ColombianGoldpollen } from "./components/seeds/ColombianGoldpollen";
import { Malawipollen } from "./components/seeds/Malawipollen";
import { Kilimanjaropollen } from "./components/seeds/Kilimanjaropollen";
import { KingsBreadpollen } from "./components/seeds/KingsBreadpollen";
import { AcapulcoGoldpollen } from "./components/seeds/AcapulcoGoldpollen";
import { LambsBreadpollen } from "./components/seeds/LambsBreadpollen";
import { HinduKushpollen } from "./components/seeds/HinduKushpollen";
import { DurbanPoisonpollen } from "./components/seeds/DurbanPoisonpollen";
import { ChocolateThaipollen } from "./components/seeds/ChocolateThaipollen";
import { Thaipollen } from "./components/seeds/Thaipollen";
import { Afghanipollen } from "./components/seeds/Afghanipollen";
import { LashkarGahpollen } from "./components/seeds/LashkarGahpollen";
import { Acehpollen } from "./components/seeds/Acehpollen";

import GiftSeed from "./components/GiftSeed";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "fullcalendar/dist/fullcalendar.css";
import "./layout/layout.css";//                                     .
import "./App.scss";//                                              M
import steemConnectAPI from "./service/SteemConnectAPI";//         dM     
import SCCallback from "./components/SCCallback";//                MMr
import UserGarden from "./components/UserGarden";//               4MMML
import FAQPage from "./components/FAQPage";//                     MMMMM.                xf     
import Tutorial from "./components/Tutorial";//   .              "MMMMM               .MM-     
import Stats from "./components/Stats";//          Mh..          +MMMMMM            .MMMM                                   
import ReactGA from 'react-ga';//                  .MMM.         .MMMMML.          MMMMMh      
import Trending from './components/Trending';//     )MMMh.        MMMMMM         MMMMMMM       
//                                                   3MMMMx.     'MMMMMMf      xnMMMMMM"       
const trackingID ="UA-111263990-4"//                 '*MMMMM      MMMMMM.     nMMMMMMP"        
//                                                     *MMMMMx    "MMMMM\    .MMMMMMM=         
ReactGA.initialize('UA-111263990-4', {//                *MMMMMh   "MMMMM"   JMMMMMMP           
  debug: true,//                                          MMMMMM   3MMMM.  dMMMMMM            .
  titleCase: false,//                                      MMMMMM  "MMMM  .MMMMM(        .nnMP"
});//                                          =..          *MMMMx  MMM"  dMMMM"    .nnMMMMM*  
//                                               "MMn...     'MMMMr 'MM   MMM"   .nMMMMMMM*"   
function initializeReactGA() {//                  "4MMMMnn..   *MMM  MM  MMP"  .dMMMMMMM""     
  ReactGA.initialize(trackingID);//                 ^MMMMMMMMx.  *ML "M .M*  .MMMMMM**"        
  ReactGA.pageview('/login');//                        *PMMMMMMhn. *x > M  .MMMM**""           
}//                                                        ""**MMMMhx/.h/ .=*"                  
//                                                                  .3P"%....                   
export const StateContext = React.createContext();//              nP"     "*MMnx       DaFreakyG
ReactGA.ga('send', 'pageview', '/login'); 

class App extends Component {
  constructor() {
    const accessToken = localStorage.getItem("sc_token");

    if (accessToken) {
      steemConnectAPI.setAccessToken(accessToken);
    }
    super();
    this.state = {
      layoutMode: "static",
      layoutColorMode: "dark",
      staticMenuInactive: true,
      overlayMenuActive: true,
      mobileMenuActive: false,
      localState: {
        username: "",
        login: username =>
          this.setState(state => ({
            localState: {
              ...state.localState,
              username
            }
          })),
        steemConnectAPI,
        loginType: undefined
      }
    };

    this.onWrapperClick = this.onWrapperClick.bind(this);
    this.onToggleMenu = this.onToggleMenu.bind(this);
    this.onSidebarClick = this.onSidebarClick.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.createMenu();
  }

  onWrapperClick(event) {
    if (!this.menuClick) {
      this.setState({
        overlayMenuActive: false,
        mobileMenuActive: false
      });
    }

    this.menuClick = false;
  }

  onToggleMenu(event) {
    this.menuClick = true;

    if (this.isDesktop()) {
      if (this.state.layoutMode === "overlay") {
        this.setState({
          overlayMenuActive: !this.state.overlayMenuActive
        });
      } else if (this.state.layoutMode === "static") {
        this.setState({
          staticMenuInactive: !this.state.staticMenuInactive
        });
      }
    } else {
      const mobileMenuActive = this.state.mobileMenuActive;
      this.setState({
        mobileMenuActive: !mobileMenuActive
      });
    }

    event.preventDefault();
  }

  onSidebarClick(event) {
    this.menuClick = true;
    setTimeout(() => {
      this.layoutMenuScroller.moveBar();
    }, 500);
  }

  onMenuItemClick(event) {
    if (!event.item.items) {
      this.setState({
        overlayMenuActive: false,
        mobileMenuActive: false
      });
    }
  }

  createMenu() {
    this.menu = [
      {
        label: "Home",
      },
      {
        label: "Community",
        items: [
          {
            label: "Telegram",
            icon: {ExitToAppIcon},
            command: () => {
              /*window.location = "https://steem-engine.com/?p=market&t=KFQ";*/
              window.open('https://discord.gg/Zq29TWe', '_blank');
            }
          },
          {
            label: "Discord",
            icon: {ExitToAppIcon},
            command: () => {
              /*window.location = "https://steem-engine.com/?p=market&t=KFQ";*/
              window.open('https://discord.gg/Zq29TWe', '_blank');
            }
          },
          {
            label: "Twitter",
            icon: {ExitToAppIcon},
            command: () => {
              /*window.location = "https://steem-engine.com/?p=market&t=KFQ";*/
              window.open('https://discord.gg/Zq29TWe', '_blank');
            }
          },
        ]
      }
    ];
  }

  addClass(element, className) {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  }

  removeClass(element, className) {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  componentDidUpdate() {
    if (this.state.mobileMenuActive)
      this.addClass(document.body, "body-overflow-hidden");
    else this.removeClass(document.body, "body-overflow-hidden");
  }

  componentDidMount() {
    if (!this.state.localState.username && localStorage.getItem("sc_token")) {
      this.state.localState.steemConnectAPI
        .me()
        .then(res => {
          this.state.localState.login(res.name);
        })
        .catch(e => {
          console.log(e);
          localStorage.removeItem("sc_token");
        });
    }
  }

  render() {
    let wrapperClass = classNames("layout-wrapper", {
      "layout-overlay": this.state.layoutMode === "overlay",
      "layout-static": this.state.layoutMode === "static",
      "layout-static-sidebar-inactive":
        this.state.staticMenuInactive && this.state.layoutMode === "static",
      "layout-overlay-sidebar-active":
        this.state.overlayMenuActive && this.state.layoutMode === "overlay",
      "layout-mobile-sidebar-active": this.state.mobileMenuActive
    });
    let sidebarClassName = classNames("layout-sidebar", {
      "layout-sidebar-dark": this.state.layoutColorMode === "dark"
    });

    return (
      <StateContext.Provider value={this.state.localState}>
        <div className={wrapperClass} onClick={this.onWrapperClick}>
          <AppTopbar onToggleMenu={this.onToggleMenu} />
          <div
            ref={el => (this.sidebar = el)}
            className={sidebarClassName}
            onClick={this.onSidebarClick}
          >
            <ScrollPanel
              ref={el => (this.layoutMenuScroller = el)}
              style={{height: "120%"}}
            >
              <div className="layout-sidebar-scroll-content">
                <div className="layout-logo">
                <a href="https://etherchest.com">
                <img
                    alt="Logo"
                    src="/assets/layout/images/hashkingsbanner.png"
                  />
                  </a>
                  <br/>
                  <br/>
                </div>                
                <AppMenu
                  model={this.menu}
                  onMenuItemClick={this.onMenuItemClick}
                />
              </div>
            </ScrollPanel>
          </div>
          <div className="layout-main">
            <Route path="/" exact component={HomePage} /> 
            <Route path="/home" component={HomePage} />
          </div>
          <div className="layout-mask"></div>
        </div> 
      </StateContext.Provider>
    );
  }
}

export default App;
