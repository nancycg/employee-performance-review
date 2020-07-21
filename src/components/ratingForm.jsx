/*
 * Author : Nancy Chauhan
 * This is rating form to provide ratings as performance review of employee
 *
 * This form opens when user click on rating button for any employee(Mapping in App.js)
 *
 * When user press 'rating' button
 * Client URL: http://localhost:3000/rating/(employee_id)
 *
 * employeeService module inside services folder exposses
 * various API's like saveEmployee()/getEmployeeById()
 */

import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { saveEmployee, getEmployeeById } from "../services/employeeService";
//import { getRating } from "../services/fakeEmployeeService";

class RatingForm extends Form {
  state = {
    data: {
      firstname: "",
      lastname: "",
      department: "",
      address: "",
      phone: "",
      rating: "",
      comment: ""
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
    address: Joi.string(),
    phone: Joi.number(),
    rating: Joi.number()
      .required()
      .label("Rating")
      .min(1)
      .max(5),
    comments: Joi.string()
  };

  //When user open Employee form then the fields should be pre filled with appropriate data.
  async populateEmployee() {
    try {
      const empId = this.props.match.params.id;
      if (empId === "new") return;

      const { data: emp } = await getEmployeeById(empId);
      this.setState({ data: this.mapToViewModel(emp) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

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
      phone: emp.phone,
      rating: emp.rating,
      comments: emp.comments
    };
  }

  //On save button click this function call the API to save data in DB
  doSubmit = async () => {
    await saveEmployee(this.state.data);

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
          <h3>Rating Form</h3>
        </center>
        <form onSubmit={this.handleSubmit}>
          {this.renderRating("firstname", "First Name")}
          {this.renderRating("lastname", "Last Name")}
          {this.renderRating("department", "Department")}
          {this.renderInput(
            "rating",
            "Rating (1-Excellent/2-Very Good/3-Good/4-fair/5-Poor)"
          )}
          {this.renderInput("comments", "Comments")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default RatingForm;
