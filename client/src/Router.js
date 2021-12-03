import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import StudentDash from "./Pages/StudentDash";
import Request from "./Pages/RequestForm";
import Admin from "./Pages/Admin";
import RequestPage from "./Pages/RequestPage";
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/StudentDash" exact component={StudentDash} />
        <Route path="/AdminDash" exact component={Admin} />
        <Route path="/Request" exact component={Request} />
        <Route path="/RequestPage" exact component={RequestPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
