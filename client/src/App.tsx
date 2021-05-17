import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Message from "./components/Message";
import SetName from "./components/SetName";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Message} />
        <Route exact path="/set-name" component={SetName} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
