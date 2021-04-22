import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddEmployee from "./components/add-employee.component";
import Employee from "./components/employee.component";
import EmployeeList from "./components/employee-list.component";
import EmployeesList from "./components/employees-list.component";


class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/employee" className="navbar-brand">
          Employee
          </a>
          <div className="navbar-nav mr-auto"> 
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Employee
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/employees"} className="nav-link">
                AG Grid Employees
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/employee"]} component={EmployeeList} />
            <Route exact path={["/", "/employees"]} component={EmployeesList} />
            <Route exact path="/add" component={AddEmployee} />
            <Route path="/employee/:id" component={Employee} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;