import React from "react";
import ReactDOM from "react-dom";
import "babel-polyfill";
import App from "./App";
//import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { AppFooter } from "./AppFooter";
import { ParallaxProvider } from 'react-scroll-parallax';

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#001214"
    }
  }
});
  
ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
    <MuiThemeProvider theme={theme}>
    <CssBaseline />
      <ParallaxProvider>
        <App />
      </ParallaxProvider>
      <AppFooter />
    </MuiThemeProvider>
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
