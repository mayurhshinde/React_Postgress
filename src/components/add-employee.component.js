import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";

export default class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDOB = this.onChangeDOB.bind(this);
    this.backEmployee = this.backEmployee.bind(this);

    this.saveEmployee = this.saveEmployee.bind(this);
    this.newEmployee = this.newEmployee.bind(this);

    this.state = {
      id: null,
      firstname: "",
      lastname: "",
      address: "",
      email: "",
      dob: "",

      submitted: false
    };
  }
  backEmployee() {
    this.props.history.push('/Employee');
  }

  onChangeFirstname(e) {
    this.setState({
      firstname: e.target.value
    });
  }

  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value
    });
  }
  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangeDOB(e) {
    this.setState({
      dob: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  saveEmployee() {
    var data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      address: this.state.address,
      email: this.state.email,
      dob: this.state.dob
    };

    EmployeeDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          address: response.data.address,
          email: response.data.email,
          dob: response.data.dob,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newEmployee() {
    this.setState({
      id: null,
      firstname: "",
      lastname: "",
      address: "",
      email: "",
      dob: "",
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success mr-2" onClick={this.newEmployee}>
              Add
              </button>
              <button
              type="submit"
              className="badge badge-dark"
              onClick={this.backEmployee}
            >
              Back
            </button>
          </div>
        ) : (
            <div>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  required
                  value={this.state.firstname}
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
                  value={this.state.lastname}
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
                  value={this.state.address}
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
                  value={this.state.email}
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
                  value={this.state.dob}
                  onChange={this.onChangeDOB}
                  name="dob"
                />
              </div>

              <button onClick={this.saveEmployee} className="btn btn-success mr-2">
                Submit
              </button>
              <button
              type="submit"
              className="btn btn-dark "
              onClick={this.backEmployee}
            >
              Back
            </button>
            </div>
          )}
      </div>
    );
  }
}