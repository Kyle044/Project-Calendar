import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import StudentDash from "./Pages/StudentDash";
import Request from "./Pages/RequestForm";
import Admin from "./Pages/Admin";
import RequestPage from "./Pages/RequestPage";
import FAQStud from "./Pages/FAQStud";
import FormStud from "./Pages/FormStud";
function Router() {
  return (
    <BrowserRouter>
      <Switch>
      
        <Route path="/" exact component={Home} />
        <Route path="/StudentDash" exact component={StudentDash} />
        <Route path="/AdminDash" exact component={Admin} />
        <Route path="/Request" exact component={Request} />
        <Route path="/RequestPage" exact component={RequestPage} />
        <Route path="/FAQStudPage" exact component={FAQStud} />
        <Route path="/FormStudPage" exact component={FormStud} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
