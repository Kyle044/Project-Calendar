import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import StudentDash from "./Pages/StudentDash";
import Request from "./Pages/RequestForm";
import Admin from "./Pages/Admin";
import RequestPage from "./Pages/RequestPage";
import FAQStud from "./Pages/FAQStud";
import FormStud from "./Pages/FormStud";
import FAQTable from "./Pages/FAQTable";
import AboutReg from "./Pages/AboutReg";
import advisoryTable from "./Pages/AdvisoryTable";
import formTable from "./Pages/FormTable";
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/AboutReg" exact component={AboutReg} />
        <Route path="/StudentDash" exact component={StudentDash} />
        <Route path="/AdminDash" exact component={Admin} />
        <Route path="/Request" exact component={Request} />
        <Route path="/RequestPage" exact component={RequestPage} />
        <Route path="/FAQStudPage" exact component={FAQStud} />
        <Route path="/FormStudPage" exact component={FormStud} />
        <Route path="/FAQTable" exact component={FAQTable} />
        <Route path="/advisoryTable" exact component={advisoryTable} />
        <Route path="/formTable" exact component={formTable} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
