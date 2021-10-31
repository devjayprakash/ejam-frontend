import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/homepage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/"} exact component={Homepage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
