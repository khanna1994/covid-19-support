import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import HelpfulLinks from "./components/helpfulLinks/helpfulLinks";
import IndiaTracker from "./components/indiaTracker/indiaTracker";
import BuyItems from "./components/buyItems/buyItems"
import "./App.css";

function App() {
  return (
    <div className="App" id="body">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/helpful-links" component={HelpfulLinks} />
          <Route path="/India-covid19-tracker" component={IndiaTracker} />item-at-doorstep
          <Route path="/item-at-doorstep" component={BuyItems} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
