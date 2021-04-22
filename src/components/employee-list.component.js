import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import { Link } from "react-router-dom";


export default class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveEmployee = this.retrieveEmployee.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEmployee = this.setActiveEmployee.bind(this);
    this.removeAllEmployee = this.removeAllEmployee.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      Employee: [],
      currentEmployee: null,
      currentIndex: -1,
      firstname: ""
    };
  }

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

    return (
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
    );
  }
}