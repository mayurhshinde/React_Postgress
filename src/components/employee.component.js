import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import { Link } from "react-router-dom";

export default class Employee extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDOB = this.onChangeDOB.bind(this);

    this.getEmployee = this.getEmployee.bind(this);
    this.updatesubmitted = this.updatesubmitted.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.backEmployee = this.backEmployee.bind(this);

    this.state = {
      currentEmployee: {
        address: "",
        dob: Date.now(),
        email: "",
        firstname: "",
        id: null,
        isactive: null,
        lastname: "",
        submitted: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getEmployee(this.props.match.params.id);
  }


  onChangeFirstname(e) {
    const firstname = e.target.value;
    this.setState(function (prevState) {
      return {
        currentEmployee: {
          ...prevState.currentEmployee,
          firstname: firstname
        }
      };
    });
  }

  onChangeLastname(e) {
    const lastname = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEmployee: {
          ...prevState.currentEmployee,
          lastname: lastname
        }
      };
    });
  }
  onChangeAddress(e) {
    const address = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEmployee: {
          ...prevState.currentEmployee,
          address: address
        }
      };
    });
  }

  onChangeDOB(e) {
    const dob = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEmployee: {
          ...prevState.currentEmployee,
          dob: dob
        }
      };
    });
  }
  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEmployee: {
          ...prevState.currentEmployee,
          email: email
        }
      };
    });
  }
  getEmployee(id) {
    EmployeeDataService.get(id)
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            currentEmployee: response.data[0]
          });
          console.log(response.data[0]);
          console.log(this.state);
        }
      })
      .catch(e => {
        console.log(e);
      });

  }

  updatesubmitted(status) {
    var data = {
      id: this.state.currentEmployee.id,
      firstname: this.state.currentEmployee.firstname,
      lastname: this.state.currentEmployee.lastname,
      address: this.state.currentEmployee.address,
      dob: this.state.currentEmployee.dob,
      email: this.state.currentEmployee.email,
      submitted: status
    };

    EmployeeDataService.update(this.state.currentEmployee.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentEmployee: {
            ...prevState.currentEmployee,
            submitted: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateEmployee() {
    EmployeeDataService.update(
      this.state.currentEmployee.id,
      this.state.currentEmployee
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Employee was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  backEmployee() {
    this.props.history.push('/Employee');
  }
  deleteEmployee() {
    EmployeeDataService.delete(this.state.currentEmployee.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/Employee')
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { currentEmployee } = this.state;

    return (
      <div>
        {currentEmployee ? (
          <div className="edit-form">
            <h4>Edit Employee</h4>
            <form>
              <div>
                <div className="form-group">
                  <label htmlFor="firstname">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    required
                    value={this.state.currentEmployee.firstname}
                    onChange={this.onChangeFirstname}
                    name="firstname"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    required
                    value={this.state.currentEmployee.lastname}
                    onChange={this.onChangeLastname}
                    name="lastname"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    required
                    value={this.state.currentEmployee.address}
                    onChange={this.onChangeAddress}
                    name="address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    required
                    value={this.state.currentEmployee.email}
                    onChange={this.onChangeEmail}
                    name="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">DOB</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    required
                    value={this.state.currentEmployee.dob}
                    onChange={this.onChangeDOB}
                    name="dob"
                  />
                </div>
              </div>
            </form>



            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteEmployee}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success mr-2"
              onClick={this.updateEmployee}
            >
              Update
            </button>

            <button
              type="submit"
              className="badge badge-dark"
              onClick={this.backEmployee}
            >
              Back
            </button>
            
            <p>{this.state.message}
            </p>
          </div>
        ) : (
            <div>
              <br />
              <p>Please click on a Employee...</p>
            </div>
          )}
      </div>
    );
  }
}