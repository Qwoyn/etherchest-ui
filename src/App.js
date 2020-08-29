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
        label: "Farm",
        items: [
          {
            label: "Fields",
            to: "/farm"
          },
          {
            label: "Office",
            to: "/accounting"
          },
        ]
      },
      {
        label: "Market",
        items: [
          {
            label: "Farm Plots",
            to: "/market/farmplots"
          },
          {
            label: "Seeds",
            to: "/market/seedbank"
          },
        ]
      },
      {
        label: "Community",
        items: [
          {
            label: "Trending Posts",
            to: "/trending"
          },
          {
            label: "Twitch Streams",
            to: "/streams"
          },
          {
            label: "Curation Trail",
            command: () => {
              /*window.location = "https://steem-engine.com/?p=market&t=KFQ";*/
              window.open('https://steempeak.com/@hashkings/introducing-hashkings-curation-trail', '_blank');
            }
          },
          {
            label: "Steemit Hive",
            command: () => {
              /*window.location = "https://steem-engine.com/?p=market&t=KFQ";*/
              window.open('https://beta.steemit.com/trending/hive-164881', '_blank');
            }
          },
          {
            label: "Chat on Discord",
            icon: {ExitToAppIcon},
            command: () => {
              /*window.location = "https://steem-engine.com/?p=market&t=KFQ";*/
              window.open('https://discord.gg/Zq29TWe', '_blank');
            }
          },
        ]
      },
      {
        label: "Growers Association",
        to: "/growers"
      },
      {
        label: "About",
        to: "/faq"
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
                <a href="/">
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
                <Partners />
              </div>
            </ScrollPanel>
          </div>
          <div className="layout-main">
            <Route path="/login" component={LoginPage} />
            <Route path="/" exact component={HomePage} />
            <Route path="/garden/:username" component={UserGarden} />
            <Route exact path="/farm" component={GardenPage} />
            <Route path="/market/farmplots" component={MarketPlots} />
            <Route path="/market/seedbank" component={MarketSeeds} />
            <Route path="/callback" component={SCCallback} />
            <Route path="/faq" component={FAQPage} />
            <Route path="/accounting" component={Stats} />
            <Route path="/tutorial" component={Tutorial} />
            <Route path="/market/MarketSupplies" component={MarketSupplies} />
            <Route path="/trending" component={Trending} />
            <Route path="/streams" component={TwitchStreams} />
            <Route path="/growers" component={BoardMemberApp} />  
            <Route path="/home" component={HomePage} />
            <Route path="/markets" component={GiftSeed} />

            <Route path="/seeds/steem-og" component={SteemOG} />
            <Route path="/seeds/afghani" component={Afghani} />
            <Route path="/seeds/colombian-gold" component={ColombianGold} />
            <Route path="/seeds/lashkar-gah" component={LashkarGah} />
            <Route path="/seeds/chocolate-thai" component={ChocolateThai} />
            <Route path="/seeds/thai" component={Thai} />
            <Route path="/seeds/swazi-gold" component={SwaziGold} />
            <Route path="/seeds/malawi" component={Malawi} />
            <Route path="/seeds/kings-bread" component={KingsBread} />
            <Route path="/seeds/kilimanjaro" component={Kilimanjaro} />
            <Route path="/seeds/acapulco-gold" component={AcapulcoGold} />
            <Route path="/seeds/durban-poison" component={DurbanPoison} />
            <Route path="/seeds/lambs-bread" component={LambsBread} />
            <Route path="/seeds/mazar-i-sharif" component={MazariSharif} />
            <Route path="/seeds/hindu-kush" component={HinduKush} />
            <Route path="/seeds/panama-red" component={PanamaRed} />
            <Route path="/seeds/aceh" component={Aceh} />

            <Route path="/pollen/colombian-gold" component={ColombianGoldpollen} />
            <Route path="/pollen/lashkar-gah" component={LashkarGahpollen} />
            <Route path="/pollen/chocolate-thai" component={ChocolateThaipollen} />
            <Route path="/pollen/thai" component={Thaipollen} />
            <Route path="/pollen/swazi-gold" component={SwaziGoldpollen} />
            <Route path="/pollen/malawi" component={Malawipollen} />
            <Route path="/pollen/kings-bread" component={KingsBreadpollen} />
            <Route path="/pollen/kilimanjaro" component={Kilimanjaropollen} />
            <Route path="/pollen/acapulco-gold" component={AcapulcoGoldpollen} />
            <Route path="/pollen/durban-poison" component={DurbanPoisonpollen} />
            <Route path="/pollen/lambs-bread" component={LambsBreadpollen} />
            <Route path="/pollen/mazar-i-sharif" component={MazariSharifpollen} />
            <Route path="/pollen/hindu-kush" component={HinduKushpollen} />
            <Route path="/pollen/panama-red" component={PanamaRedpollen} />
            <Route path="/pollen/aceh" component={Acehpollen} />
            <Route path="/pollen/afghani" component={Afghanipollen} />

            <Route path="/plots/Afghanistan" component={Afghanistan} />
            <Route path="/plots/Africa" component={Africa} />
            <Route path="/plots/Asia" component={Asia} />
            <Route path="/plots/Central-America" component={CentralAmerica} />
            <Route path="/plots/Jamaica" component={Jamaica} />
            <Route path="/plots/Mexico" component={Mexico} />
          </div>
          <div className="layout-mask"></div>
        </div> 
      </StateContext.Provider>
    );
  }
}

export default App;
