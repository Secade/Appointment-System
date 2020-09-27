import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import LoginComponent from '../src/components/sign-in/LoginComponent';
import Secretary from '../src/components/secretary/pages/secretary-view';
//import DentistPage from '../src/components/dentist/DentistPageComponent';
/*
import Navbar from "./components/secretary/small_components/Navbar.component";
import addProcMainForm from "./components/secretary/AddApp/addProcMainForm.component"
import week_all from "../src/components/secretary/views/week_all.component";
import week_avail from "../src/components/secretary/views/week_avail.component";
import day_one from "../src/components/secretary/views/day_one.component";
import day_all from "../src/components/secretary/views/day_all.component";
import week_unavailable from "../src/components/secretary/views/week_unavailable.component";
import loginComponent from "../src/components/sign-in/LoginComponent"
import Example from "./components/secretary/small_components/appointment_modal.component";
import LoginComponent from '../src/components/sign-in/LoginComponent';
import resetPassword from '../src/components/sign-in/ResetPasswordModalComponent'
import ResetPasswordModalComponent from '../src/components/sign-in/ResetPasswordModalComponent';
import LoginClarification from '../src/components/sign-in/LoginClarification';
import DentistPage from '../src/components/dentist/DentistPageComponent';
*/
//This gets called by index.js
function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      {/* <Example/> */}
      {/* <addProcMainForm/> */}
     {/*} <LoginComponent></LoginComponent>*/}
    {/*} <DentistPage></DentistPage>*/}
    <Route path ='/' exact component = {LoginComponent} />
    <Route path ='/secretary' exact component = {Secretary} />
    {/*}  <Route path="/week_all" component={week_all} />
      <Route path="/week_avail" component={week_avail} />
      <Route path="/day_all" component={day_all} />
      <Route path="/week_unavailable" component={week_unavailable} />
  <Route path="/day_one" component={day_one} /> */}
      
    </Router>
    
  );
}

export default App;
