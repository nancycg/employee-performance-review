/*
 * Author : Nancy Chauhan
 *
 * All the mapping components (Employee/Department/EmployeeForm/RatingForm) 
 * mapped with specified URLs here in App.js
 *
 */

import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import RatingForm from "./components/ratingForm";
import Employee from "./components/employee";
import Department from "./components/department";
import EmployeeForm from "./components/employeeForm";

import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <main className="container">
        <ToastContainer />
        <Switch>
          <Route path="/employee/:id" component={EmployeeForm} />
          <Route path="/rating/:id" component={RatingForm} />
          <Route path="/employee" component={Employee} />
          <Route path="/department" component={Department} />
          <Redirect from="/" exact to="/employee" />
        </Switch>
      </main>
    );
  }
}

export default App;
