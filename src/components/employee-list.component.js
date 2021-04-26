import React, { useState } from "react";
import EmployeeDataService from "../services/employee.service";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";



export default class EmployeeList extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveEmployee = this.retrieveEmployee.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEmployee = this.setActiveEmployee.bind(this);
    this.removeAllEmployee = this.removeAllEmployee.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
    this.state = {
      Employee: [],
      currentEmployee: null,
      currentIndex: -1,
      firstname: "",
      show: false
    };
  }

  handleClose() {
    this.setState({
      show: false
    });
  }
  handleShow() {
    this.setState({
      show: true
    });
  }
  onLoginFormSubmit(e) {
    console.log('this event is call');
    e.preventDefault();
    this.handleClose();
  };

  componentDidMount() {
    this.retrieveEmployee();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({
      firstname: searchTitle
    });
  }

  retrieveEmployee() {
    EmployeeDataService.getAll()
      .then(response => {
        this.setState({
          Employee: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveEmployee();
    this.setState({
      currentEmployee: null,
      currentIndex: -1
    });
  }

  setActiveEmployee(Employee, index) {
    this.setState({
      currentEmployee: Employee,
      currentIndex: index
    });
  }

  removeAllEmployee() {
    EmployeeDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    EmployeeDataService.findByTitle(this.state.firstname)
      .then(response => {
        this.setState({
          Employee: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }

  render() {
    const { firstname, currentEmployee } = this.state;


    const LoginForm = ({ onSubmit }) => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      return (
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" block>
            Login
      </Button>
        </Form>
      );
    };


    return (
      <>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "10vh" }}
        >
          <Button variant="primary" onClick={this.handleShow}>
            Add Employee
        </Button>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm onSubmit={this.onLoginFormSubmit} />

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close Modal
          </Button>
          </Modal.Footer>
        </Modal>

        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by first name"
                value={firstname}
                onChange={this.onChangeSearchTitle}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.firstname}
                >
                  Search
              </button>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <h4>Employees List</h4>

            <div className="row">
              <table className="table table-striped table-bordered">
                <thead><tr>
                  <th>Name</th>
                  <th>Adress</th>
                  <th>Email</th>
                  <th>Date of Birth</th>
                  <th>Action</th>
                </tr></thead>
                <tbody>
                  {
                    this.state.Employee.map(
                      employee =>
                        <tr key={employee.id}>
                          <td>{employee.firstname} {employee.lastname}</td>
                          <td>{employee.address}</td>
                          <td>{employee.email}</td>
                          <td>{this.formatDate(employee.dob)}</td>
                          <td>
                            <Link
                              to={"/Employee/" + employee.id}
                              className="badge badge-warning">
                              Edit
                          </Link>
                          </td>
                        </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-6">
            {currentEmployee ? (
              <div>
                <h4>Employee</h4>
                <div>
                  <label>
                    <strong>FirstName:</strong>
                  </label>{" "}
                  {currentEmployee.firstname}
                </div>
                <div>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentEmployee.description}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentEmployee.published ? "Published" : "Pending"}
                </div>

                <Link
                  to={"/Employees/" + currentEmployee.id}
                  className="badge badge-warning"
                >
                  Edit
              </Link>
              </div>
            ) : (
              <div>
                <br />
                {/* <p>Please click on a Employee...</p> */}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

