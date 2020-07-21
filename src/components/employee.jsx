/*
 * Author : Nancy Chauhan
 * This is main employee component.
 *
 * Client URL : http://localhost:3000/employee mapped in App.js
 * 
 * "react-toastify" module is used for popping up error nicel on unexpected error.
 * "react-helmet" module is used for showing the title name in browser.
 * 
 * employeeService module inside services folder exposses various API's like getEmployee()/deleteEmployee()
 */

import React, { Component } from "react";
import { getEmployee, deleteEmployee } from "../services/employeeService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

class Employee extends Component {
  //maintain the state of object
  state = {
    employee: []
  };

  //componentDidMount is called once the component is actually mounted to the DOM.
  async componentDidMount() {
    const { data: employee } = await getEmployee();
    this.setState({ employee });
  }

  //Handling the delete button click and calling appropriate API for deleting data.
  handleDelete = async employee => {
    //saving the emp record which need to be deleted.
    const originalEmployee = this.state.employee;

    //extracting the emp record which need to be deleted from main data
    const emp = originalEmployee.filter(m => m._id !== employee._id);

    //set new/current data to state
    this.setState({ emp });

    //calling API to actually delete the data from DB
    try {
      await deleteEmployee(employee._id);
      this.componentDidMount(); //refresh
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This employee has already been deleted.");

      //if error occurs then reset the state of data to original.
      this.setState({ emp: originalEmployee });
    }
  };

  //render funtion to render data in table on employee page
  render() {

    //calculating the number of records fetched from DB.
    const { length: count } = this.state.employee;
    //According to the number of records, displaying message.
    let msg;
    if (count === 0) {
      msg = <p>There is no employee data in the database.</p>;
    } else {
      msg = <p>Showing {count} employees in the database.</p>;
    }

    //This is table in which data will be rendered and displayed on employee webpage. 
    return (
      <React.Fragment>
        <center
          style={{
            border: "groove",
            color: "Black",
            fontWeight: "bold",
            marginBottom: 20,
            marginTop: 40
          }}
        >
          <h3>Employee Performance Review System</h3>
        </center>

        <div>
          <Helmet>
            <title>iterpro</title>
          </Helmet>
        </div>

        <Link
          to="/employee/new"
          className="btn btn-primary"
          style={{ marginBottom: 20, marginTop: 40 }}
        >
          Add Employee
        </Link>
        <div> {msg} </div>
        <table className="table">
          <thead>
            <tr
              style={{
                color: "black",
                backgroundColor: "#ffff80",
                fontWeight: "bold"
              }}
            >
              <th>First Name</th>
              <th>Last Name</th>
              <th>Department</th>
              <th>Address</th>
              <th>Phone</th>
              <th />
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.employee.map(employee => (
              <tr key={employee._id}>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.department}</td>
                <td>{employee.address}</td>
                <td>{employee.phone}</td>
                <td>
                  <Link
                    to={`/employee/${employee._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Update
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(employee)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link
                    to={`/rating/${employee._id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    Rating
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Employee;
