import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Message from "./components/Message";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Message} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
