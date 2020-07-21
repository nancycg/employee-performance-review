/*
 * Author : Nancy Chauhan
 * This is employee form to add/modify data.
 *
 * This form open up in two conditions(Mapping in App.js)
 *
 * When user press 'Add Employee' button
 * Client URL : http://localhost:3000/employee/new
 *
 * When user press 'Update' button
 * URL: http://localhost:3000/employee/(employee_id)
 *
 *
 *
 * employeeService module inside services folder exposses
 * various API's like saveEmployee()/getEmployeeById()
 */

import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { saveEmployee, getEmployeeById } from "../services/employeeService";
//import { getRating } from "../services/fakeRatingService";

class EmployeeForm extends Form {
  state = {
    data: {
      firstname: "",
      lastname: "",
      department: "",
      address: "",
      phone: ""
    },
    errors: {}
  };

  //defining the schema for data to be diplayed with Joi module validations.
  schema = {
    _id: Joi.string(),
    firstname: Joi.string()
      .required()
      .label("First Name"),
    lastname: Joi.string()
      .required()
      .label("Last Name"),
    department: Joi.string()
      .required()
      .label("Department"),
    address: Joi.string()
      .required()
      .label("Address"),
    phone: Joi.number()
      .min(999999999)
      .max(999999999999)
      .required()
      .error(errors => {
        return {
          message: "Phone number must be of 10 to 12 digits(only)"
        };
      })
      .label("Phone")
  };

  //When user open Employee form then the fields should be pre filled with appropriate data.
  async populateEmployee() {
    try {
      //if new user need to be created then no pre filling data is required.
      const empId = this.props.match.params.id;
      if (empId === "new") return;

      //for the given employee id, fetch the data and fill it in form fields.
      const { data: emp } = await getEmployeeById(empId);

      //set the new state for data
      this.setState({ data: this.mapToViewModel(emp) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  //componentDidMount is called once the component is actually mounted to the DOM.
  async componentDidMount() {
    await this.populateEmployee();
  }

  //This function map each field with data received from DB.
  mapToViewModel(emp) {
    return {
      _id: emp._id,
      firstname: emp.firstname,
      lastname: emp.lastname,
      department: emp.department,
      address: emp.address,
      phone: emp.phone
    };
  }

  //On save button click this function call the API to save data in DB
  doSubmit = async () => {
    console.log("doSubmit this.state.data : " + this.state.data);
    await saveEmployee(this.state.data);

   /*
    * This history prop comes from the History library.
    * 'history.push' pushes a new entry onto the history stack 
    * that is redirecting the user to another route.
    */
    this.props.history.push("/employee");
  };

  render() {
    return (
      <div>
        <center
          style={{
            border: "groove",
            color: "Black",
            fontWeight: "bold",
            marginBottom: 60,
            marginTop: 20
          }}
        >
          <h3>Employee Form</h3>
        </center>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("firstname", "First Name")}
          {this.renderInput("lastname", "Last Name")}
          {this.renderInput("department", "Department")}
          {this.renderInput("address", "Address")}
          {this.renderInput("phone", "Phone")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default EmployeeForm;
